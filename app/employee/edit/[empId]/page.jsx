import Link from "next/link";
import Form from "../../../components/Form";

const EditEmployee = ({ params }) => {
  let { empId } = params;
  return (
    <div>
      <div className='flex justify-end m-4'>
        <Link href="/employee/list">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            List View
          </button>
        </Link>
      </div>
      <Form formName="Edit Employee" btnName="Save" id={empId} />
    </div>
  );
};

export default EditEmployee;