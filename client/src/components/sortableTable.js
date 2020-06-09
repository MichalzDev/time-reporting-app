import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
=======
import PDF from "./pdf";
>>>>>>> aa42d11a49acf40ec1ed9d36ec97e0a16329f276
import jsPDF from "jspdf";
import "jspdf-autotable";
import Form from "react-bootstrap/Form";

const FilterableTable = require("react-filterable-table");

const Table = ({ reports, redirect }) => {
<<<<<<< HEAD
=======
  const [month, setMonth] = useState("");

>>>>>>> aa42d11a49acf40ec1ed9d36ec97e0a16329f276
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
    fetch("http://localhost:5000/reports/acceptAll", {
      method: "PUT",
    });

<<<<<<< HEAD
    redirect("/supervisor");
=======
    window.location.reload()
>>>>>>> aa42d11a49acf40ec1ed9d36ec97e0a16329f276
  };

  const acceptOne = (id) => {
    fetch("http://localhost:5000/reports/acceptOne/" + id, {
      method: "PUT",
    });

<<<<<<< HEAD
    redirect("/supervisor");
=======
    window.location.reload()
>>>>>>> aa42d11a49acf40ec1ed9d36ec97e0a16329f276
  };

  const rejectOne = (id) => {
    fetch("http://localhost:5000/reports/rejectOne/" + id, {
      method: "PUT",
    });

<<<<<<< HEAD
    redirect("/supervisor");
=======
    window.location.reload()
>>>>>>> aa42d11a49acf40ec1ed9d36ec97e0a16329f276
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Raport";
    const headers = [["PROJEKT", "KTO", "DATA", "GODZINY", "STATUS"]];

<<<<<<< HEAD
    const data = reports.map((el) => [
      el.report_project,
      el.report_who,
      el.report_from,
      el.report_hours,
      el.report_status,
    ]);
=======
    var data = [];
    if (month === "" || month === "none") {
      data = reports.map((el) => [
        el.report_project,
        el.report_who,
        el.report_from,
        el.report_hours,
        el.report_status,
      ]);
    } else {
      data = reports
        .filter((el) => el.report_from === month)
        .map((el) => [
          el.report_project,
          el.report_who,
          el.report_from,
          el.report_hours,
          el.report_status,
        ]);
    }
>>>>>>> aa42d11a49acf40ec1ed9d36ec97e0a16329f276

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("raport.pdf");
  };

  return (
    <Container>
      <Button
        type="submit"
        variant="warning"
        className="mb-3"
        onClick={() => acceptAll()}
      >
        AKCEPTUJ WSZYSTKIE NIEZWERYFIKOWANE
      </Button>
<<<<<<< HEAD
      <div>
        <Button variant="info" onClick={() => exportPDF()} className="mb-3">
          Generuj Report
        </Button>
      </div>
=======
      <Row>
        <Button
          variant="info"
          onClick={() => exportPDF(month)}
          className="mb-3 ml-3"
        >
          Generuj Report
        </Button>
        <Form.Control
          style={{ width: "50%" }}
          className="ml-5"
          as="select"
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="none" selected disabled>
            Wybierz Miesiąc
          </option>
          <option value="Styczeń">Styczeń</option>
          <option value="Luty">Luty</option>
          <option value="Marzec">Marzec</option>
          <option value="Kwiecień">Kwiecień</option>
          <option value="Maj">Maj</option>
          <option value="Czerwiec">Czerwiec</option>
          <option value="Lipiec">Lipiec</option>
          <option value="Sierpień">Sierpień</option>
          <option value="Wrzesień">Wrzesień</option>
          <option value="Październik">Październik</option>
          <option value="Listopad">Listopad</option>
          <option value="Grudzień">Grudzień</option>
        </Form.Control>
      </Row>
>>>>>>> aa42d11a49acf40ec1ed9d36ec97e0a16329f276
      <Row>
        <Col xs={9}>
          <FilterableTable data={reports} fields={fields} />
        </Col>
        <Col xs={3} style={{ paddingTop: "130px" }}>
          {reports.map((row, index) => {
            return (
              <Row className="mt-2">
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  className="ml-2 mt-2"
                  onClick={() => acceptOne(row._id)}
                >
                  AKCEPTUJ
                </Button>
                <Button
                  type="submit"
                  variant="danger"
                  size="sm"
                  className="ml-2 mt-2"
                  onClick={() => rejectOne(row._id)}
                >
                  ODRZUC
                </Button>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Table;
