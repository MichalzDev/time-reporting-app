import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import "bootstrap/dist/css/bootstrap.min.css";
import PDF from './pdf';

const FilterableTable = require("react-filterable-table");

const Table = ({reports, redirect}) => {
  const fields = [
    {
      name: "report_project",
      displayName: "PROJEKT",
      inputFilterable: true,
      sortable: true,
    },
    {
      name: "report_who",
      displayName: "KTO",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "report_from",
      displayName: "DATA",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "report_hours",
      displayName: "GODZINY",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "report_status",
      displayName: "STATUS",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
  ];

  const acceptAll = () => {
    fetch('http://localhost:5000/reports/acceptAll', {
      method: 'PUT'
    })

    redirect('/supervisor')
  }

  const acceptOne = (id) => {
    fetch('http://localhost:5000/reports/acceptOne/' + id, {
      method: 'PUT'
    })

    redirect('/supervisor')
  }

  const rejectOne = (id) => {
    fetch('http://localhost:5000/reports/rejectOne/' + id, {
      method: 'PUT'
    })

    redirect('/supervisor')
  }

  return (
    <Container>
      <Button type="submit" variant="warning" className="mb-3" onClick={() => acceptAll()}>AKCEPTUJ WSZYSTKIE NIEZWERYFIKOWANE</Button>
        <Row>
            <Col xs={9}>
      <FilterableTable
        data={reports}
        fields={fields}
      />
      </Col>
      <Col xs={3} style={{paddingTop: '130px'}}>
      {reports.map((row, index) => {
          return <Row className="mt-2">
              <Button type="submit" variant="success" size="sm" className="ml-2 mt-2" onClick={() => acceptOne(row._id)}>AKCEPTUJ</Button>
              <Button type="submit" variant="danger" size="sm" className="ml-2 mt-2" onClick={() => rejectOne(row._id)}>ODRZUC</Button>
          </Row>
        
      })}
      </Col>
      </Row>
      <PDF reports={reports}/>
    </Container>
  );
};

export default Table;