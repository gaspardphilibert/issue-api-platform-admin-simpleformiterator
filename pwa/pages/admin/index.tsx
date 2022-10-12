import { ResourceGuesser } from "@api-platform/admin";
import { Edit, Resource } from "react-admin";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Admin = dynamic(()=> import("../../components/Admin"), {ssr: false})

const AdminPage = () => {

  return (
    <>
      <Head>
        <title>API Platform Admin</title>
      </Head>

      <Admin/>
    </>
  );
};
export default Admin;
