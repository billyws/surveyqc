import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import { NavBar } from "../../components/Layouts/NavBar";
import provs from "../../assets/prov.json";
import { useState } from "react";
const prisma = new PrismaClient();

export async function getServerSideProps() {
  const interviews = await prisma.sdesmain.findMany();
  return {
    props: { interviews },
  };
}

export default function Checkin({ interviews }) {
  // Set the initial state for the data that is coming in from the database
  const [interviewsData, setInterviewsData] = useState(interviews);
  const [hhSampleNumber, setHhSampleNumber] = useState("");
  const [clusterNumber, setClusterNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectProv, setSelectProv] = useState("Select Province");

  // match prov.id to a01_province
  const province = provs.map(
    (prov) => prov.id === interviewsData[0].a01_province
  );

  // Handle the selection of the province
  const handleSelect = (e) => {
    if (provinces === e.target.value) {
      console.log(`${province} selected`);
    }
  };

  return (
    <div>
      {/* Main navigation */}
      <NavBar />
      {/* Main body content - Display props data here */}
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <select
            className="w-1/2 p-2 my-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onChange={(e) => handleSelect(e.currentTarget.value)}
          >
            <option value="Select Province">Select Province</option>
            {provs.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
              </option>
            ))}
          </select>
          </div>
      <div>
        <h1>Interviews by Household / Cluster </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th>Hh_ID</th>
              <th>Cluster Number</th>
              <th>Province</th>
            </tr>
          </thead>
          <tbody>
            {interviewsData.map((interview) => (
              <tr>
                <td>{interview.a06_hhsampleNumber}</td>
                <td>{interview.a02_clusterNumber}</td>
                <td>{interview.a01_province}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
