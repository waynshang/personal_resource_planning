import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";
import {isPresent} from "../Common"
function TimeLine(props) {
  const columns = [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'string', label: 'Resource' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },]
  const [data, setData] = useState([columns]);
  console.log(props.data)
  useEffect(() => {
    console.log([columns, ...props.data,])
    if (isPresent(props.data)) setData([columns].concat(props.data))
  }, [props.data])
  console.log(data)

  return (
    <div>
      <Chart
        width={'100%'}
        // height={'400px'}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          height: 400,
          gantt: {
            trackHeight: 30,
            percentEnabled: false,
          },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  );
}

export default TimeLine;