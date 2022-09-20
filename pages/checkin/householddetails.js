import Head from "next/head";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getServerSideProps() {
  const householdRoster = await prisma.sdesmain.findMany();
  return {
    props: { householdRoster },
  };
}

function householdClusterRoster({ householdRoster }) {
  return (
    <div>
      <h1>Interviews by Household / Cluster </h1>
      <table class="table-auto">
        <thead>
          <tr>
            <th>Hh_ID</th>
            {householdRoster.map((clusterNumber) => (
              <th>{clusterNumber.a02_clusterNumber}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default householdClusterRoster;
