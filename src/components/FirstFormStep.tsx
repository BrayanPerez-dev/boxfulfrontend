"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/FirstFormStep.module.css";
import { Button, DatePicker, Form, Input, Select } from "antd";
import localFont from "next/font/local";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IPersonDetails } from "@/interfaces/person";
import dayjs from "dayjs"
const semiBold = localFont({
  src: "../pages/fonts/AlbertSans-SemiBold.ttf",
  variable: "--albert-sans-semi-bold",
});
enum DepartmentKeys {
  SanSalvador = "San Salvador",
  LaLibertad = "La Libertad",
  SantaAna = "Santa Ana",
}
const departments: Record<DepartmentKeys, string[]> = {
  [DepartmentKeys.SanSalvador]: [
    "San Salvador",
    "Soyapango",
    "Mejicanos",
    "Apopa",
    "Ilopango",
  ],
  [DepartmentKeys.LaLibertad]: [
    "Santa Tecla",
    "Antiguo Cuscatlán",
    "Nueva San Salvador",
    "Colón",
    "Quezaltepeque",
  ],
  [DepartmentKeys.SantaAna]: [
    "Santa Ana",
    "Metapán",
    "Chalchuapa",
    "Coatepeque",
    "Texistepeque",
  ],
};

interface FirstFormStepProps {
  onFinishPersonDetailsForm:(values:IPersonDetails) => void;
  personDetails:IPersonDetails | null
}
const FirstFormStep = ({onFinishPersonDetailsForm,personDetails}:FirstFormStepProps) => {
  const [form] = Form.useForm()
  const [selectedDepartament, setSelectedDepartament] = useState<string | null>(
    null
  );
  const [towns, setTowns] = useState<string[]>([]);

  const handleDepartamentoChange = (value: string) => {
    setSelectedDepartament(value);
    const someKey = value as DepartmentKeys;
    setTowns(departments[someKey] || []);
  };
  const collectionDirectionOptions = [
    {
      value: 1,
      label:
        "Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel.",
    },
  ];
  useEffect(() => {
    if(personDetails){
      form.setFieldsValue({...personDetails,scheduled_date:dayjs(personDetails.scheduled_date)})
    }
  }, [form, personDetails])
  
  return (
    <section className={styles.main}>
      <Form layout="vertical" requiredMark={false} onFinish={onFinishPersonDetailsForm} form={form}>
        <div className={styles.row}>
          <Form.Item
            name="collection_direction"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                📍 Dirección de recolección
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <Select
              options={collectionDirectionOptions}
              rootClassName={styles.selectCollectionDirection}
              dropdownStyle={{ height: "auto" }}
            />
          </Form.Item>
          <Form.Item
            name="scheduled_date"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                📅 Fecha Programada
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              rootClassName={styles.datePicker}
              suffixIcon={
                <Image
                  src="/calendar.svg"
                  alt="calendario"
                  width={24}
                  height={27}
                  priority
                />
              }
              size="large"
            />
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            name="first_name"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                Nombre
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <Input rootClassName={styles.input} size="large" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                Apellidos
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <Input rootClassName={styles.input} size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                Correo Electronico
              </span>
            }
            rules={[
              {
                required: true,
                message: "Por favor, llene este campo",
              },
              {
                message: "Por favor, escribe un email valido",
                type: "email",
              },
            ]}
          >
            <Input rootClassName={styles.input} size="large"/>
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            name="telephone"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                Teléfono
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <PhoneInput
              country={"sv"} // Define el país inicial (El Salvador en este caso)
              onlyCountries={["sv", "us", "mx"]} // Lista de países opcional
              disableDropdown={false} // Para habilitar el dropdown
              enableSearch={true} // Habilita la búsqueda
              placeholder="Número de teléfono"
              inputStyle={{ width: "360px", height: "60px" }} // Estilo para ocupar el ancho completo
              containerStyle={{ width: "100%" }}
              onChange={phone => form.setFieldValue("telephone",phone)}
            />
          </Form.Item>
          <Image
            src="/location.svg"
            alt="ubicacion"
            width={20}
            height={25}
            priority
          />
          <Form.Item
            name="destination_address"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                Dirección del destinatario
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <Input rootClassName={styles.destinationAddress} size="large"/>
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            name="department"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                Departamento
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <Select
              onChange={handleDepartamentoChange}
              value={selectedDepartament}
              allowClear
              options={Object.keys(departments).map((departament) => {
                return { value: departament, label: departament };
              })}
              rootClassName={styles.select}
              dropdownStyle={{ height: "auto" }}
            />
          </Form.Item>
          <Form.Item
            name="town"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                Municipio
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <Select
              value={towns.length > 0 ? null : undefined}
              disabled={towns.length === 0}
              allowClear
              options={towns.map((town) => {
                return { value: town, label: town };
              })}
              rootClassName={styles.select}
              dropdownStyle={{ height: "auto" }}
            />
          </Form.Item>
          <Form.Item
            name="reference"
            label={
              <span className={`${styles.label} ${semiBold.variable}`}>
                Punto de Referencia
              </span>
            }
            rules={[{ required: true, message: "Por favor, llene este campo" }]}
          >
            <Input rootClassName={styles.input} size="large" />
          </Form.Item>
        </div>
        <Form.Item
          name="indications"
          label={
            <span className={`${styles.label} ${semiBold.variable}`}>
              Indications
            </span>
          }
          rules={[{ required: true, message: "Por favor, llene este campo" }]}
        >
          <Input rootClassName={styles.indicationsInput} size="large"/>
        </Form.Item>
        <div className={styles.btnContainer}>
        <Button className={`${styles.btn} ${semiBold.variable}`} type="primary" size="large" htmlType="submit">
          Siguiente
          <Image
            src="/arrow-right.svg"
            alt="flecha"
            width={30}
            height={30}
            priority
          />
        </Button>
        </div>
      </Form>
    </section>
  );
};

export default FirstFormStep;
