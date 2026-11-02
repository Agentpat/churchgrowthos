import {
  FaChartPie,
  FaMoneyBillWave,
  FaReceipt,
} from "react-icons/fa";

import {
  Tabs,
  Tab,
} from "./FinanceTabs.styles";

const FinanceTabs = ({
  activeSection = "overview",
  onChange,
}) => {
  const tabs = [
    {
      key: "overview",
      label: "Overview",
      icon: FaChartPie,
    },
    {
      key: "offerings",
      label: "Offerings",
      icon: FaMoneyBillWave,
    },
    {
      key: "expenses",
      label: "Expenses",
      icon: FaReceipt,
    },
  ];

  return (
    <Tabs>
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <Tab
            key={tab.key}
            type="button"
            $active={
              activeSection ===
              tab.key
            }
            onClick={() =>
              onChange?.(
                tab.key,
              )
            }
          >
            <Icon />

            {tab.label}
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default FinanceTabs;