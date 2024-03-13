import { formatter } from "../util/investment";

const TableRow = ({header, year, interest, valueEndOfYear, annualInvestment }) => {
    const initialInvestment = valueEndOfYear - interest - annualInvestment;
    const totalInterest = valueEndOfYear - annualInvestment * year - initialInvestment;
    const totalAmountInvested = valueEndOfYear - totalInterest;
    
    const props = [
        year,
        formatter.format(valueEndOfYear),
        formatter.format(interest),
        formatter.format(totalInterest),
        formatter.format(totalAmountInvested)
    ];

    const headers = [
        'Year',
        'Investment Value',
        'Interest (Year)',
        'Total Interest',
        'Invested Capital'
    ];

    let innerData;
    header ?
        innerData = <thead><tr>{headers.map((data, index) => <th key={index + 1}>{data}</th>)}</tr></thead>
        :
        innerData = <tbody><tr>{props.map((data, index) => <td key={index + 1}>{data}</td>)}</tr></tbody>
    
    return <>{innerData}</>;
};

export default TableRow;