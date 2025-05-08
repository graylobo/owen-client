"use client";

import { useEffect } from "react";
import Link from "next/link";

const styles = {
  errorContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center" as const,
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#424242",
  },
  message: {
    color: "#616161",
    marginBottom: "1.5rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  resetButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#48a4ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
  },
  linkStyle: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    color: "#616161",
    textDecoration: "none",
    fontWeight: 600,
  },
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Fatal error:", error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div style={styles.errorContainer}>
          <h2 style={styles.heading}>치명적인 오류가 발생했습니다</h2>
          <p style={styles.message}>
            {error.message || "알 수 없는 오류가 발생했습니다."}
          </p>
          <div style={styles.actions}>
            <button onClick={() => reset()} style={styles.resetButton}>
              다시 시도
            </button>
            <Link href="/" style={styles.linkStyle}>
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
