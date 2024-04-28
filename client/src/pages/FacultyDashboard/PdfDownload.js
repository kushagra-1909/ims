import React from "react";
import LnmLogo from "./lnmLogo.jpg";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  image: {
    width: 160,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  table: {
    flexDirection: "column",
    border: "1 solid #000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #000",
  },
  columnHeader: {
    width: "25%",
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
  },
  cell: {
    width: "25%",
    padding: 5,
  },
});

// Create a component to render the table dynamically
const Table = ({ data }) => (
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={styles.columnHeader}>S. no.</Text>
      <Text style={styles.columnHeader}>Item Name</Text>
      <Text style={styles.columnHeader}>Quantity Requested</Text>
      <Text style={styles.columnHeader}>Quantity Approved</Text>
    </View>
    {/* {console.log("data: ",data)} */}
    {data.map((row, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>{row.item.itemName}</Text>
        <Text style={styles.cell}>{row.quantityRequested}</Text>
        <Text style={styles.cell}>{row.quantityApproved}</Text>
      </View>
    ))}
  </View>
);

// Create a component for the PDF
export const PDFDocument = ({ Items }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image src={LnmLogo} style={styles.image} />
      </View>
      <Text style={styles.heading}>Requisition Slip</Text>
      <Table data={Items} />
    </Page>
  </Document>
);
