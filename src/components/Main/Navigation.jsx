"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import styles from '@/styles/Components/Navigation/navigation.module.css';

export default function Navigation(){
    return(
        <nav className={styles.nav}>
            <h1 className={styles.h1}>Employee Records</h1>
            <div className={styles.div}>
                <Link href={"/"}>
                    <Button variant="contained" color="secondary" id="buttonHome" className={styles.button}>Home</Button>
                </Link>
                <Link href={"/Employee"}>
                    <Button variant="contained" id="buttonRecord" className={styles.button}>Record</Button>
                </Link>
            </div>
        </nav>
    )
}