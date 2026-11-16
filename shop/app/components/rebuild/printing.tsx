export default function PrintingReceipt() {
  return (
    <div className="rb rb-loading" role="status" aria-live="polite" aria-label="Printing a receipt">
      <div className="rb-wrap rb-sec">
        <div className="rb-slot" aria-hidden="true" />
        <div className="rb-paper rb-loading-slip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
