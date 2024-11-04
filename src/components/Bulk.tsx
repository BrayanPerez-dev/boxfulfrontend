"use client";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/SecondFormStep.module.css";
import { Input } from "antd";
import { IBulk } from "@/interfaces/bulk";
const semiBold = localFont({
  src: "../pages/fonts/AlbertSans-SemiBold.ttf",
  variable: "--albert-sans-semi-bold",
});

interface BulkProps {
  deleteBulk: (value: number) => void;
  bulk: IBulk;
  index: number;
  handleInputChange: (index: number, field: string, value: string) => void;
}
const Bulk = ({ bulk, handleInputChange, deleteBulk, index }: BulkProps) => {
  return (
    <div className={styles.bulk} key={index}>
      <div className={styles.form}>
        <div className={styles.editableItem}>
          <span className={`${styles.label} ${semiBold.variable}`}>
            Peso en libras
          </span>
          <Input
            rootClassName={styles.inputSize}
            size="large"
            suffix={
              <span className={`${styles.label} ${semiBold.variable}`}>lb</span>
            }
            value={bulk.weight_pounds}
            onChange={(e) =>
              handleInputChange(index, "weight_pounds", e.target.value)
            }
          />
        </div>
        <div className={styles.editableItem}>
          <span className={`${styles.label} ${semiBold.variable}`}>
            Contenido
          </span>
          <Input
            rootClassName={styles.inputDecription}
            size="large"
            value={bulk.description}
            onChange={(e) =>
              handleInputChange(index, "description", e.target.value)
            }
          />
        </div>
        <div className={styles.sizes}>
          <span className={styles.bulkIcon}>
            <Image
              src="/bulk.svg"
              alt="bulto"
              width={26}
              height={27}
              priority
              className={styles.bulkIcon}
            />
          </span>
          <div className={styles.editableItem}>
            <span className={`${styles.label} ${semiBold.variable}`}>
              Largo
            </span>
            <Input
              rootClassName={`${styles.inputSize} ${styles.inputLength}`}
              size="large"
              suffix={
                <span className={`${styles.label} ${semiBold.variable}`}>
                  cm
                </span>
              }
              value={bulk.length}
              onChange={(e) =>
                handleInputChange(index, "length", e.target.value)
              }
            />
          </div>
          <div className={styles.editableItem}>
            <span className={`${styles.label} ${semiBold.variable}`}>Alto</span>
            <Input
              rootClassName={`${styles.inputSize} ${styles.inputHeight}`}
              size="large"
              suffix={
                <span className={`${styles.label} ${semiBold.variable}`}>
                  cm
                </span>
              }
              value={bulk.height}
              onChange={(e) =>
                handleInputChange(index, "height", e.target.value)
              }
            />
          </div>
          <div className={styles.editableItem}>
            <span className={`${styles.label} ${semiBold.variable}`}>
              Ancho
            </span>
            <Input
              rootClassName={`${styles.inputSize} ${styles.inputWidth}`}
              size="large"
              suffix={
                <span className={`${styles.label} ${semiBold.variable}`}>
                  cm
                </span>
              }
              value={bulk.width}
              onChange={(e) =>
                handleInputChange(index, "width", e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.trashContainer}>
        <Image
          className={styles.trash}
          onClick={() => deleteBulk(index)}
          src="/trash.svg"
          alt="borrar"
          width={30}
          height={30}
          priority
        />
      </div>
    </div>
  );
};

export default Bulk;
