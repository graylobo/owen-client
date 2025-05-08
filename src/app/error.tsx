"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <h2>확인해주세요!</h2>
      <p>{error.message || "알 수 없는 오류가 발생했습니다."}</p>
      <div className={styles.actions}>
        <button onClick={() => reset()} className={styles.resetButton}>
          다시 시도
        </button>
        <Link href="/" className={styles.homeLink}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
