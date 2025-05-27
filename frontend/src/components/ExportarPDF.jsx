import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportarPDF = ({ titulo = "Exportación", columnas = [], filas = [], nombreArchivo = "documento.pdf" }) => {
  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(titulo, 14, 22);

    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 30,
    });

    doc.save(nombreArchivo);
  };

  return (
    <button onClick={generarPDF}>
      Exportar PDF
    </button>
  );
};

export default ExportarPDF;


