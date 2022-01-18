import React, { useRef, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useDimensions from '../../hooks/useDimensions';
import Text from '../../components/Text';

function getAnnotationZoomData(annotation) {
  const largestDimension = Math.max(annotation.w, annotation.h);
  const scale = 100 / (largestDimension + 5);

  const centerX = annotation.x + 0.5 * annotation.w;
  const centerY = annotation.y + 0.5 * annotation.h;

  return {
    tx: 50 - centerX,
    ty: 50 - centerY,
    scale,
  };
}

export default function AnnotatedPhoto({
  annotations,
  title,
  src,
  style,
  imageHeight,
  imageWidth,
  locationId,
  dateString,
  renderTitleButton = () => null,
  children,
  ...rest
}) {
  const theme = useTheme();

  const containerRef = useRef(null);
  const { width } = useDimensions(containerRef);
  const [zoomed, setZoomed] = useState(annotations.length === 1);
  const [zoomData, setZoomData] = useState(
    annotations.length === 1
      ? getAnnotationZoomData(annotations[0])
      : null,
  );

  const svgHeight = (width * imageHeight) / imageWidth;

  function getRectProperties(annotation, currentlyZoomed) {
    return {
      x: `${annotation.x}%`,
      y: `${annotation.y}%`,
      width: `${annotation.w}%`,
      height: `${annotation.h}%`,
      cursor: currentlyZoomed ? 'zoom-out' : 'zoom-in',
      fill: 'transparent',
      onClick: () => {
        if (currentlyZoomed) {
          setZoomed(false);
        } else {
          setZoomed(true);
          setZoomData(getAnnotationZoomData(annotation));
        }
      },
    };
  }

  return (
    <div
      ref={containerRef}
      style={{ margin: 16, width: '100%', ...style }}
      {...rest}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 4,
        }}
      >
        <Text variant="subtitle1">{title}</Text>
        {renderTitleButton()}
      </div>
      <div
        style={{
          overflow: 'hidden',
          lineHeight: 0,
          position: 'relative',
          backgroundColor: 'dimgrey',
        }}
      >
        <svg
          style={{
            transform: zoomed
              ? `scale(${zoomData.scale})`
              : 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
            cursor: zoomed ? 'zoom-out' : 'unset',
          }}
          width={width}
          height={svgHeight}
          transform="scale(1)"
        >
          <g
            style={{
              transform: zoomed
                ? `translate(${zoomData.tx}%, ${zoomData.ty}%)`
                : 'translate(0, 0)',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <image
              onClick={() => {
                if (zoomed) setZoomed(false);
              }}
              href={src}
              width={width}
              height={svgHeight}
            />
            {annotations.map(annotation => (
              <React.Fragment key={annotation.id}>
                <rect
                  {...getRectProperties(annotation, zoomed)}
                  strokeWidth={10}
                  stroke={theme.palette.common.white}
                />
                <rect
                  {...getRectProperties(annotation, zoomed)}
                  strokeWidth={4}
                  stroke={theme.palette.common.black}
                />
              </React.Fragment>
            ))}
          </g>
        </svg>
        {children}
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Text>{locationId}</Text>
        <Text>{dateString}</Text>
      </div>
    </div>
  );
}
