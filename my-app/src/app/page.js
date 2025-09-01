"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <h1>HelloWorld</h1>
      <Button variant="contained" href="/signin">
        Signin
      </Button>
    </div>
  );
}
