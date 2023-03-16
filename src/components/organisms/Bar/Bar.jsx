import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { Wrapper } from '../../atoms/Wrapper/Wrapper';
import { UilTimes } from '@iconscout/react-unicons';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { Text } from '../../atoms/Text/Text';

const Bar = props => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Wrapper>
      <AnimateSharedLayout>
        {expanded ? (
          <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
        ) : (
          <CompactCard param={props} setExpanded={() => setExpanded(true)} unit={props.unit ? props.unit : ''} />
        )}
      </AnimateSharedLayout>
      <br />
      <Text>Kliknij, aby zobaczyć więcej.</Text>
    </Wrapper>
  );
};

// Compact Bar
function CompactCard({ param, setExpanded, unit }) {
  function lastArrayBmiData(e) {
    if (undefined !== e && e.length) {
      return e[e.length - 1];
    }
  }

  return (
    <motion.div className="CompactCard" layoutId="expandableCard" onClick={setExpanded}>
      <div style={{ width: 200, height: 200, cursor: 'pointer' }}>
        <CircularProgressbar
          value={lastArrayBmiData(param.labelValue)}
          text={`${lastArrayBmiData(param.labelValue)}${unit ? unit : ''}`}
        />
      </div>
    </motion.div>
  );
}

// Expanded Bar
function ExpandedCard({ param, setExpanded }) {
  const data = {
    series: [
      {
        name: "Wynik",
        data: param.labelValue,
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 'auto',
        id: 'bmiForm',
      },
      xaxis: {
        type: 'date',
        categories: param.labelData,
      },
    },
  };

  return (
    <motion.div className="ExpandedCard" layoutId="expandableCard">
      <div style={{ alignSelf: 'flex-end', cursor: 'pointer', color: 'black' }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <div className="chart">
        <Chart options={data.options} series={data.series} type="area" width={500} height={320} />
      </div>
    </motion.div>
  );
}

Bar.propTypes = {
  labelValue: PropTypes.array,
  labelData: PropTypes.array,
};

export default Bar;
