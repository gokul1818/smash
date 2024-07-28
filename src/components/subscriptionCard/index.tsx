import { Cell, PieChart, ResponsiveContainer, Tooltip,Pie } from "recharts"
import { getDateFormatISO, getDaysInMonth } from "../../helpers"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SubscriptionCard = () => {
    const userData = useSelector((state: RootState) => state.auth.user);

    const { formattedDateOnly } = getDateFormatISO(userData.billDue)
    const todayDate = new Date().getDate()
    const pendingDayToBill = Number(getDaysInMonth(userData.billDue)) - Math.abs(Number(formattedDateOnly) - Number(todayDate))
    const duedata = [
        { name: 'Month', value: Number(getDaysInMonth(userData.billDue) - pendingDayToBill) },
        { name: 'Bill Due Date ', value: pendingDayToBill }
    ];
    const COLORS = ["#1355D2", '#090335'];


    return (
        <div className="subscription-card-conatiner    text-center ">
            <p className='akaya-style black-color text-center fs-24 mb-0'>
                subscription
            </p>
            <div className='d-flex flex-wrap text-center align-tems-center justify-content-center'>
                <p className='ubuntu-medium black-color text-center  mb-0 '>
                    You have played a total
                </p>
                <p className='mb-0 ms-1 dark-blue  ubuntu-bold'>
                    {userData?.played} match for
                </p>
                <p className='ubuntu-medium black-color  mb-0  '>
                    this month!
                </p>
            </div>
            <ResponsiveContainer width={100} height={100}>
                <PieChart width={100} height={100}>
                    <Pie

                        data={duedata}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        innerRadius={40}
                        fill="#8884d8"
                        label
                    >
                        {duedata.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className='d-flex subscription-card-date align-items-center'>
                <p className='audiowide-regular black-color fs-24 mb-0  '>
                    {pendingDayToBill}
                </p>
                <p className='audiowide-regular E4-black-color  mb-0  '>
                    /{getDaysInMonth(userData?.billDue)}
                </p>
            </div>
        </div>
    )
}
export default SubscriptionCard