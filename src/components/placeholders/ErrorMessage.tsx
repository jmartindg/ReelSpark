type ErrorMessageProps = {
  error: string | boolean;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <section className="px-4 pt-20 lg:px-0">
      <article className="flex justify-center">
        <div className="rounded bg-[#131312] p-6">
          <h2 className="text-red-500">{error}</h2>
        </div>
      </article>
    </section>
  );
};

export default ErrorMessage;
