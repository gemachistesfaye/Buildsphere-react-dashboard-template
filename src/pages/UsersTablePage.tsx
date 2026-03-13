import Table from "../components/Table/Table";
import { users } from "../data/mockData";
import { Layout } from "../components/Layout/Layout";

interface UsersProps {
  isDarkMode?: boolean;
}

const Users = ({ isDarkMode }: UsersProps) => {
  const columns = ["ID", "Name", "Email", "Status", "Role"];

  return (
    <Layout isDarkMode={isDarkMode}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
          Ethiopian Users Table
        </h1>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <Table columns={columns} data={users} />
        </div>
      </div>
    </Layout>
  );
};

export default Users;