import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

class PDF extends React.Component {

  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      reports: this.props.reports
    }
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Raport";
    const headers = [["PROJEKT", "KTO", "DATA", "GODZINY", "STATUS"]];

    const data = this.state.reports.map(el=> [el.report_project, el.report_who, el.report_from, el.report_hours, el.report_status]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("raport.pdf")
  }

  render() {
    return (
      <div>
        <button onClick={() => this.exportPDF()}>Gneruj Report</button>
      </div>
    );
  }
}

export default PDF;