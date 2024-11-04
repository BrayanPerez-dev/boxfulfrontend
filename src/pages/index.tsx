"use client";

import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FirstFormStep from "@/components/FirstFormStep";
import SecondFormStep from "@/components/SecondFormStep";
import { useState } from "react";
import { IPersonDetails } from "@/interfaces/person";
import { message } from "antd";
import dayjs from "dayjs";
import { IBulk } from "@/interfaces/bulk";
import { createPersonWithBulks } from "@/api/services/person";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [personDetails, setPersonDetails] = useState<IPersonDetails | null>(
    null
  );
  const [bulks, setBulks] = useState<IBulk[]>([]);
  const onFinishPersonDetailsForm = (values: IPersonDetails) => {
    setPersonDetails({
      ...values,
      scheduled_date: dayjs(values.scheduled_date).toISOString(),
    });
    setStep(2);
  };
  const onFinishBulkForm = (values: IBulk) => {
    setBulks([
      ...bulks,
      {
        ...values,
        height: Number(values.height),
        length: Number(values.length),
        width: Number(values.width),
        weight_pounds: Number(values.weight_pounds),
      },
    ]);
  };
  const deleteBulk = (value: number) => {
    const bulksPersisted = bulks.filter((_, index) => index !== value);
    setBulks(bulksPersisted);
  };
  const handleInputChange = (index: number, field: string, value: string) => {
    let numberValue = null;
    if (field !== "description" && isNaN(value as unknown as number)) {
      return;
    } else {
      numberValue = Number(value);
    }
    setBulks((prevBulks) =>
      prevBulks.map((bulk, i) =>
        i === index ? { ...bulk, [field]: numberValue || value } : bulk
      )
    );
  };

  const onFinishForms = async () => {
    if (!personDetails) {
      message.error("Ingresa los de la persona");
      return;
    }

    if (bulks.length === 0) {
      message.error("Crea almenos un bulto");
      return;
    }

    const data = {
      ...personDetails,
      bulks: bulks,
    };
    const response = await createPersonWithBulks(data);
    if (response.success) {
      setPersonDetails(null);
      setBulks([]);
      setStep(1);
      message.success("Todos los datos guardados exitosamente!");
    } else {
      message.error("Hubo un error, contacta con soporte");
    }
  };
  return (
    <>
      <Head>
        <title>BOXFUL</title>
        <meta name="description" content="boxful frontend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header />

        <main className={styles.main}>
          <Hero />
          {step === 1 ? (
            <FirstFormStep
              onFinishPersonDetailsForm={onFinishPersonDetailsForm}
              personDetails={personDetails}
            />
          ) : (
            <SecondFormStep
              setStep={setStep}
              onFinishBulkForm={onFinishBulkForm}
              bulks={bulks}
              deleteBulk={deleteBulk}
              handleInputChange={handleInputChange}
              onFinishForms={onFinishForms}
            />
          )}
        </main>
      </div>
    </>
  );
}
