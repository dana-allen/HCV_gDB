import { TickMark } from './TickMark';

export const NumberLine = ({ positions, min, range, includeLabel=false }) => {
  return (
    <div className='row-style' style={{ padding: '10px 0' }}>
      {includeLabel && <div className='label-style'></div> }
      <div className='line-area-style with-border'>
        {positions.map((pos, i) => (
          <TickMark key={i} i={i} pos={pos} min={min} range={range} />
        ))}
      </div>
    </div>
  );
};