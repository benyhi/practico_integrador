import jsPDF from "jspdf";

const ExportarPDF = (titulo, columnas, filas, nombreArchivo) => {
  const doc = new jsPDF();
  const margin = 14;
  const startY = 30;
  const lineHeight = 10;
  const cellPadding = 4;
  const fontSize = 10;

  doc.setFontSize(18);
  doc.text(titulo, margin, 22);
  doc.setFontSize(fontSize);

  // 1. Calcular ancho máximo por columna
  const columnWidths = columnas.map((col, colIndex) => {
    let maxWidth = doc.getTextWidth(col) + cellPadding * 2;

    filas.forEach(fila => {
      const cellText = fila[colIndex]?.toString() ?? "";
      const cellWidth = doc.getTextWidth(cellText) + cellPadding * 2;
      if (cellWidth > maxWidth) maxWidth = cellWidth;
    });

    return maxWidth;
  });

  // 2. Dibujar encabezado
  let x = margin;
  let y = startY;

  columnas.forEach((col, colIndex) => {
    const w = columnWidths[colIndex];
    doc.rect(x, y, w, lineHeight);
    doc.text(col, x + cellPadding, y + lineHeight / 2 + 2);
    x += w;
  });

  // 3. Dibujar filas
  y += lineHeight;

  filas.forEach(fila => {
    x = margin;
    fila.forEach((celda, colIndex) => {
      const text = celda?.toString() ?? "";
      const w = columnWidths[colIndex];
      doc.rect(x, y, w, lineHeight);
      doc.text(text, x + cellPadding, y + lineHeight / 2 + 2);
      x += w;
    });
    y += lineHeight;
  });

  doc.save(nombreArchivo || "tabla.pdf");
  console.log("✅ PDF exportado sin autoTable, con columnas ajustadas.");
};

export default ExportarPDF;
