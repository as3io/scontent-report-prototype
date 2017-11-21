import React, { Component } from 'react';

class DataTable extends Component {
  render() {
    const { data, headers } = this.props;
    const th = headers.map(col => (<th key={col}>{col}</th>))
    const fData = data.map((r, i) => (<tr key={i}><td key={'url'}>{r.url}</td><td key={'views'}>{r.views}</td></tr>))
    return (
      <table className="table table-sm text-left">
      {headers &&
        <thead className="thead"><tr>{th}</tr></thead>
      }
        <tbody>
          {fData}
        </tbody>
      </table>
    );
  }
}

DataTable.defaultProps = {
  headers: []
}

export default DataTable;
