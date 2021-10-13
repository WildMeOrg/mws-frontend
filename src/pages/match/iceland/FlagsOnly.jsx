import React, { useState } from 'react';
import { get } from 'lodash-es';

import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { DataGrid } from '@material-ui/data-grid';

import MainColumn from '../../../components/MainColumn';
import InlineButton from '../../../components/InlineButton';
import JobModal from './JobModal';
import ids from './icelandIds';
import useStatus from './useStatus';
import useNotes from './useNotes';

export default function FlagsOnly() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(undefined);
  const { data: statuses, loading: statusLoading } = useStatus(
    selectedJob,
  );
  const { data: notes, loading: notesLoading } = useNotes(
    selectedJob,
  );

  const data = ids.map(datum => ({
    ...datum,
    id: `${datum.acmId}-${datum.taskId}-${datum.annotationID}`,
    status: get(statuses, datum.acmId, 'To do'),
    notes: get(notes, datum.acmId, ''),
  }));

  const filteredData = data.filter(datum => {
    if (datum.status === 'Flagged for review') return true;
    return false;
  });

  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: ({ value }) =>
        statusLoading ? <Skeleton /> : value,
    },
    {
      field: 'acmId',
      headerName: 'Job Id (ACM Id)',
      width: 330,
      renderCell: ({ data: rowData, value }) => (
        <InlineButton
          onClick={() => {
            setSelectedJob(rowData);
          }}
        >
          {value}
        </InlineButton>
      ),
    },
    {
      field: 'notes',
      headerName: 'Notes',
      width: 1200,
      renderCell: ({ value }) =>
        notesLoading ? <Skeleton /> : value,
    },
  ];

  return (
    <MainColumn>
      <Typography
        variant="h5"
        component="h5"
        style={{
          marginTop: 120,
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        Iceland Many-to-Many Matching Tool: Flagged Only
      </Typography>
      <div style={{ overflow: 'auto', height: 1900 }}>
        <DataGrid
          columns={columns}
          rows={filteredData}
          rowHeight={36}
          pageSize={50}
          page={currentPage}
          onPageChange={({ page }) => {
            // localStorage.setItem('page', page);
            setCurrentPage(page);
          }}
        />
      </div>
      <JobModal
        open={Boolean(selectedJob)}
        acmId={get(selectedJob, 'acmId')}
        taskId={get(selectedJob, 'taskId')}
        notes={notes}
        onClose={() => setSelectedJob(null)}
      />
    </MainColumn>
  );
}
