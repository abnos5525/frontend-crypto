import { Header as AntdHeader } from "antd/es/layout/layout";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";

export default function Header() {
  return (
    <AntdHeader className="!bg-white dark:!bg-xcolor1 border-b border-gray-200 dark:border-gray-700 !px-6 h-16">
      <div className="flex items-center justify-between align-middle h-full">
        <div className="flex items-center gap-2 h-full"></div>
        <div className="flex items-center h-full">
          <div className="flex flex-row items-center justify-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          <div className="w-[1px] h-[50%] bg-gray-200 dark:bg-xcolor10 mx-5"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0 border border-r-2 border-gray-800 dark:border-gray-100 px-5 h-full flex items-center justify-center">
            آرنیتکس
          </h2>
        </div>
      </div>
    </AntdHeader>
  );
}
