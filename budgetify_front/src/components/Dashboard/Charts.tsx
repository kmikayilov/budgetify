
import { FC, useState, useCallback } from 'react';
import { LineChart, BarChart, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Sector } from 'recharts';

const COLORS = [
	'#6accbc',
	'#158fad',
	'#884dff',
	'#eb96eb',
	'#b8255f',
	'#e05194',
	'#ff8d85',
	'#ccac93',
	'#afb83b',
	'#ff9933',
	'#ff9933',
	'#28acc0',
];

interface chartProps {
	data: any;
	children?: any;
};

export const ColumnChart: FC<chartProps> = ({ data, children }) => (
	<ResponsiveContainer width="100%" height="100%">
		<BarChart data={data}>
			<XAxis dataKey="name" stroke="#7b8794" />
			<YAxis stroke="#7b8794" />
			<Legend width={100} />
			<Tooltip />
			{children}
		</BarChart>
	</ResponsiveContainer>
);

export const LineGraph: FC<chartProps> = ({ data, children }) => (
	<ResponsiveContainer width="100%" height="100%">
		<LineChart data={data}>
			<XAxis stroke="#7b8794" dataKey="name" />
			<YAxis stroke="#7b8794" />
			<Legend />
			<Tooltip />
			{children}
		</LineChart>
	</ResponsiveContainer>
);

export const DonutChart: FC<chartProps> = ({ data }) => {
	
	const [activeIndex, setActiveIndex] = useState(0);
	const onPieEnter = useCallback(
		(_: any, index: any) => {
			setActiveIndex(index);
		}, [setActiveIndex]
	);

	const renderActiveShape = (props: any) => {
		const {
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle,
			fill,
			payload,
			percent,
			value,
		} = props;

		return (
			<g>
				<text
					className="small"
					x={cx}
					y={cy - 15}
					dy={8}
					textAnchor="middle"
					fill={fill}>
					{payload.name}
				</text>
				<text
					className="small"
					x={cx}
					y={cy + 10}
					dy={8}
					textAnchor="middle"
					fill={fill}>
					{`${value} AZN (${(percent * 100).toFixed(2)}%)`}
				</text>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
			</g>
		);
	};

	return (
		<ResponsiveContainer width="80%" height="80%">
			<PieChart width={100} height={100}>
				<Pie
					data={data || []}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={80}
					activeIndex={activeIndex}
					activeShape={renderActiveShape}
					onMouseEnter={onPieEnter}
					paddingAngle={5}
					dataKey="value">
					{data &&
						data.map((entry: any, index: any) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};