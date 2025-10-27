import ReportBox from '../ReportBox';

export default function ReportBoxExample() {
  return (
    <div className="h-[300px]">
      <ReportBox
        onSubmit={(report) => console.log('Report submitted:', report)}
        isSubmitting={false}
      />
    </div>
  );
}
