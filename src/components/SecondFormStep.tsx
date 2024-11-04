"use client";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/SecondFormStep.module.css";
import { Button, Form, Input } from "antd";
import { IBulk } from "@/interfaces/bulk";
import Bulk from "./Bulk";
const semiBold = localFont({
  src: "../pages/fonts/AlbertSans-SemiBold.ttf",
  variable: "--albert-sans-semi-bold",
});
interface SecondFormStep {
  setStep: (value: number) => void;
  onFinishBulkForm: (values: IBulk) => void;
  bulks: IBulk[];
  deleteBulk: (value: number) => void;
  handleInputChange: (index: number, field: string, value: string) => void;
  onFinishForms:()=> void;
}
const SecondFormStep = ({
  setStep,
  onFinishBulkForm,
  bulks,
  deleteBulk,
  handleInputChange,
  onFinishForms
}: SecondFormStep) => {
  const [form] = Form.useForm();

  return (
    <section className={styles.main}>
      <br />
      <p className={`${styles.label} ${semiBold.variable}`}>
        Agrega tus bultos
      </p>
      <br />
      <div className={styles.bulkContainer}>
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={(values) => {
            form.resetFields()
            onFinishBulkForm(values)
          }}
          form={form}
        >
          <div className={styles.form}>
            <div className={styles.sizes}>
              <span className={styles.bulkIcon}>
              <Image
                src="/bulk.svg"
                alt="bulto"
                width={26}
                height={27}
                priority
              />
              </span>
              <Form.Item
                name="length"
                label={
                  <span className={`${styles.label} ${semiBold.variable}`}>
                    Largo
                  </span>
                }
                rules={[
                  { required: true, message: "Llene este campo" },
                  {
                    pattern: /^\d+(\.\d{1,2})?$/,
                    message: "Solo números",
                  },
                ]}
              >
                <Input
                  rootClassName={`${styles.inputSize} ${styles.inputLength}`}
                  size="large"
                  suffix={
                    <span className={`${styles.label} ${semiBold.variable}`}>
                      cm
                    </span>
                  }
                />
              </Form.Item>
              <Form.Item
                name="height"
                label={
                  <span className={`${styles.label} ${semiBold.variable}`}>
                    Alto
                  </span>
                }
                rules={[
                  { required: true, message: "Llene este campo" },
                  {
                    pattern: /^\d+(\.\d{1,2})?$/,
                    message: "Solo números",
                  },
                ]}
              >
                <Input
                  rootClassName={`${styles.inputSize} ${styles.inputHeight}`}
                  size="large"
                  suffix={
                    <span className={`${styles.label} ${semiBold.variable}`}>
                      cm
                    </span>
                  }
                />
              </Form.Item>
              <Form.Item
                name="width"
                label={
                  <span className={`${styles.label} ${semiBold.variable}`}>
                    Ancho
                  </span>
                }
                rules={[
                  { required: true, message: "Llene este campo" },
                  {
                    pattern: /^\d+(\.\d{1,2})?$/,
                    message: "Solo números",
                  },
                ]}
              >
                <Input
                  rootClassName={`${styles.inputSize} ${styles.inputWidth}`}
                  size="large"
                  suffix={
                    <span className={`${styles.label} ${semiBold.variable}`}>
                      cm
                    </span>
                  }
                />
              </Form.Item>
            </div>
            <Form.Item
              name="weight_pounds"
              label={
                <span className={`${styles.label} ${semiBold.variable}`}>
                  Peso en libras
                </span>
              }
              rules={[
                { required: true, message: "Llene este campo" },
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: "Solo números",
                },
              ]}
            >
              <Input
                rootClassName={styles.inputSize}
                size="large"
                suffix={
                  <span className={`${styles.label} ${semiBold.variable}`}>
                    lb
                  </span>
                }
              />
            </Form.Item>
            <Form.Item
              name="description"
              label={
                <span className={`${styles.label} ${semiBold.variable}`}>
                  Contenido
                </span>
              }
              rules={[{ required: true, message: "Llene este campo" }]}
            >
              <Input rootClassName={styles.inputDecription} size="large" />
            </Form.Item>
          </div>
          <div className={styles.btnContainer}>
            <Button
              className={`${styles.btnAddBulk} ${semiBold.variable}`}
              type="primary"
              size="large"
              htmlType="submit"
            >
              Agregar
              <Image
                src="/plus.svg"
                alt="mas"
                width={20}
                height={20}
                priority
              />
            </Button>
          </div>
        </Form>
      </div>
      <br />
      <p className={`${styles.label} ${semiBold.variable}`}>Ver bultos</p>
      <br />
      <div className={styles.bulksContainer}>
        {bulks.map((bulk, index) => (
          <Bulk key={index} index={index} bulk={bulk} deleteBulk={deleteBulk} handleInputChange={handleInputChange}/>
        ))}
      </div>
      <div className={styles.buttons}>
        <Button
          className={`${styles.btnPrev} ${semiBold.variable}`}
          type="primary"
          size="large"
          onClick={() => setStep(1)}
        >
          <Image
            src="/arrow-left.svg"
            alt="flecha"
            width={20}
            height={20}
            priority
          />
          Regresar
        </Button>
        <Button
          className={`${styles.btnSave} ${semiBold.variable}`}
          type="primary"
          size="large"
          onClick={onFinishForms}
        >
          Enviar
        </Button>
      </div>
    </section>
  );
};

export default SecondFormStep;
