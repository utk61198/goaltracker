import { Paper } from '@material-ui/core';
import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,Tooltip,Legend
} from 'recharts';

const data = [
  { name: 'Finished Goals', value: 1 },
  { name: 'Unfinished goals', value: 2 },
  
];
const COLORS = ['red', 'green', 'blue', 'yellow'];


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/3Leoa7f4/';

  render() {
    return (
        <Paper elevation={10} style={{backgroundColor:"whitesmoke"}}> 
            <PieChart width={300} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          innerRadius={55}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
        <Legend/>

        
      </PieChart>
        </Paper>
    
    );
  }
}
