import { Table as CustomTable } from "antd";

import "./Table.css";
import "./AntdTable.css"

type TableProps = {
  columns: {}[];
  rows: any;
  pagination?: boolean;
  pageSize?: number;
  rowKey?: any;
  loading?: boolean;
};

function Table({
  columns,
  rows,
  pagination,
  pageSize = 9,
  rowKey,
  loading,
  ...props
}: TableProps) {
  return (
    <CustomTable
      columns={columns}
      dataSource={rows}
      className="wrapper_table"
      rowClassName={() => "row_table"}
      pagination={pagination && { pageSize: pageSize }}
      rowKey={rowKey}
      loading={loading}
      {...props}
    />
  );
}

export default Table;
