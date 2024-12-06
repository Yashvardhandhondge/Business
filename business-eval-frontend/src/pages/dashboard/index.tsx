import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../../NewComponents/Card";
import CurrentCashflow from "../../NewComponents/CurrentCashflow";
import ExpectedSalary from "../../NewComponents/ExpectedSalary";
import GrossRevenue from "../../NewComponents/GrossRevenue";
import AskingPrice from "../../NewComponents/AskingPrice";
import SDE from "../../NewComponents/SDE";
import DSCRCalculator from "../../NewComponents/DSCRCalculator";
import ProjectedCashflow from "../../NewComponents/ProjectedCashflow";
import GrossMultiple from "../../NewComponents/GrossMultiple";
import SDEMultiple from "../../NewComponents/SDEMultiple";
import SBALoanPayment from "../../NewComponents/SBALoanPayment";
import AdditionalLoanPayment from "../../NewComponents/AdditionalLoanPayment";
import TotalDebtPayments from "../../NewComponents/TotalDebtPayments";
import ProjectedNetProfitMargin from "../../NewComponents/ProjectedNetProfitMargin";
import CustomMetric from "../../NewComponents/CustomMetric";
import NotesComponent from "../../NewComponents/NotesComponent";
import TopBar from "../../NewComponents/TopBar";
import MetricCard from "../../NewComponents/MetricCard";
import { useParams } from "react-router-dom";
import useBusinessStore from "../../store/buisnessSrore";
import SbaLoanPaymentCard from "../../NewComponents/SBALoanPayment";

const App: React.FC = () => {
  const params = useParams()
  const {fetchBusiness, updateBusiness} = useBusinessStore()
  const businessid = params.id
  const [businessData, setBusinessData] = useState<any>()
  const [state, setState] = useState({
    currentCashflow: 0,
    expectedSalary: 0,
    grossRevenue: 0,
    askingPrice: 0,
    sde: 0,
    projectedCashflow: 0,
    totalDebtPayments: 0,
    sbaLoanPayment: 0,
    additionalLoanPayment: 0,
    customMetric: 0,
    projectedNetProfitMargin:0,
    dscr: 0,
    grossMultiple:0,
    sdeMultiple: 0,
    loan_sba_term:0,
    loan_sba_rate:0,
    additional_loan_term:0,
    additional_loan_rate:0,
    additional_loan_amount:0,
    notes: {
      currentCashflow: ["Notes for currentCashflow"],
      expectedSalary: ["Notes for expectedSalary"],
      grossRevenue: ["Notes for grossRevenue"],
      askingPrice: ["Notes for askingPrice"],
      sde: ["Notes for sde"],
      projectedCashflow: ["Notes for projectedCashflow"],
      totalDebtPayments: ["Notes for totalDebtPayments"],
      sbaLoanPayment: ["Notes for sbaLoanPayment"],
      additionalLoanPayment: ["Notes for additionalLoanPayment"],
      customMetric: ["Notes for customMetric"],
      projectedNetProfitMargin: ["Notes for projectedNetProfitMargin"],
    }
  });

  const [cardOrder, setCardOrder] = useState([
    "currentCashflow",
    "expectedSalary",
    "grossRevenue",
    "askingPrice",
    "sde",
    "DSCRCalculator",
    "ProjectedCashflow",
    "GrossMultiple",
    "SDEMultiple",
    "SBALoanPayment",
    "AdditionalLoanPayment",
    "TotalDebtPayments",
    "ProjectedNetProfitMargin",
    "CustomMetric",
    "NotesComponent",
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusiness(businessid || "");
      console.log(data);
      setBusinessData(data?.business)
      setState({
        ...state,
        currentCashflow: data?.business?.data?.current_cashflow.value || 0,
        expectedSalary: data?.business?.data?.expected_salary.value || 0,
        grossRevenue: data?.business?.data?.gross_revenue.value || 0,
        askingPrice: data?.business?.data?.asking_price.value || 0,
        sbaLoanPayment: data?.business?.data?.loan_sba.amount || 0,
        loan_sba_term: data?.business?.data?.loan_sba.term || 0,
        loan_sba_rate: data?.business?.data?.loan_sba.rate || 0,
        additional_loan_amount: data?.business?.data?.additional_loan.amount || 0,
        additional_loan_term: data?.business?.data?.additional_loan.term || 0,
        additional_loan_rate: data?.business?.data?.additional_loan.rate || 0,
        additionalLoanPayment: data?.business?.data?.additional_loan.amount || 0,
        totalDebtPayments: (data?.business?.data?.loan_sba.amount + data?.business?.data?.additional_loan.amount) || 0,
        projectedNetProfitMargin: data?.business?.metrics?.net_profit_margin || 0,
        dscr: data?.business?.metrics?.dscr || 0,
        grossMultiple: data?.business?.metrics?.equiity_multiple || 0,
        sdeMultiple: data?.business?.metrics?.sde_multiple || 0,
        notes:{
          ...state.notes,
          currentCashflow: data?.business?.data?.current_cashflow.notes || ["Notes for currentCashflow"],
          expectedSalary: data?.business?.data?.expected_salary.notes || ["Notes for expectedSalary"],
          grossRevenue: data?.business?.data?.gross_revenue.notes || ["Notes for grossRevenue"],
          askingPrice: data?.business?.data?.asking_price.notes || ["Notes for askingPrice"],
          // sde: data?.business?.data?.sde.notes || ["Notes for sde"],
          // projectedCashflow: data?.business?.data?.projected_cashflow.notes || ["Notes for projectedCashflow"],
          // totalDebtPayments: data?.business?.data?.loan_sba.notes || ["Notes for totalDebtPayments"],
          sbaLoanPayment: data?.business?.data?.loan_sba.notes || ["Notes for sbaLoanPayment"],
          additionalLoanPayment: data?.business?.data?.additional_loan.notes || ["Notes for additionalLoanPayment"],
          // projectedNetProfitMargin: data?.business?.metrics?.net_profit_margin.notes || ["Notes for projectedNetProfitMargin"],
        },
      });
    };
    fetchData();
  }, []);

  useEffect(() => {

    //logic for updating the state
  },[state])


  const updateLoanSba = (value: {amount:number, term:number, rate:number}) => {
        setState((prevState) => ({
          ...prevState,
          sbaLoanPayment: value.amount,
          loan_sba_term: value.term,
          loan_sba_rate: value.rate,
        }));
        updateBusiness(businessid || "", {loan_sba: value});
  }
  const updateLoanAdditionalLoan = (value: {amount:number, term:number, rate:number}) => {
        setState((prevState) => ({
          ...prevState,
          additionalLoanPayment: value.amount,
          additional_loan_term: value.term,
          additional_loan_rate: value.rate,
        }));
        updateBusiness(businessid || "", {additional_loan: value});
  }
  
  const updateNotes = async (key: string, value: string) => {
    setState((prevState) => ({
      ...prevState,
      notes: {
        ...prevState.notes,
        [key]: [value],
      },
    }));
    let payload = {}
    switch(key){
      case 'currentCashflow': payload = {current_cashflow: {value:state.currentCashflow, notes:[value]}};
      break;
      case 'expectedSalary': payload = {expected_salary: {value:state.expectedSalary ,notes:[value]}}
      break;
      case 'grossRevenue': payload = {gross_revenue: {value:state.grossRevenue,notes:[value]}}
      break;
      case 'askingPrice': payload = {asking_price: {value:state.askingPrice,notes:[value]}}
      break;
      // case 'sde': payload = {sde: {value}}
      // break;
      case 'sbaLoanPayment': payload = {loan_sba: {amount:state.sbaLoanPayment,term:state.loan_sba_term,rate:state.loan_sba_rate,notes:[value]}}
      break;
      case 'additionalLoanPayment': payload = {additional_loan: {amount:state.additionalLoanPayment,term:state.additional_loan_term,rate:state.additional_loan_rate,notes:[value]}}
      break;
      }
      
      updateBusiness(businessid || "", payload);
  }

  const updateStateBackend = async (key:string, value:number) => {
    let payload = {}
    switch(key){
      case 'currentCashflow': payload = {current_cashflow: {value, notes: state.notes.currentCashflow}}
      break;
      case 'expectedSalary': payload = {expected_salary: {value, notes: state.notes.expectedSalary}}
      break;
      case 'grossRevenue': payload = {gross_revenue: {value, notes: state.notes.grossRevenue}}
      break;
      case 'askingPrice': payload = {asking_price: {value, notes: state.notes.askingPrice}}
      break;
      // case 'sde': payload = {sde: {value}}
      // break;
      case 'sbaLoanPayment': payload = {loan_sba: {amount: value, rate: state.loan_sba_rate, term: state.loan_sba_term, notes: state.notes.sbaLoanPayment}}
      break;
      case 'additionalLoanPayment': payload = {additional_loan: {amount: value, rate: state.additional_loan_rate, term: state.additional_loan_term, notes: state.notes.additionalLoanPayment}}
      break;
      case 'totalDebtPayments': payload = {loan_sba: {amount: value}, additional_loan: {amount: value}}
      break
      case 'loan_sba_amount': payload = {loan_sba: {amount: value, rate: state.loan_sba_rate, term: state.loan_sba_term}}
      break
      case 'loan_sba_rate': payload = {loan_sba: {rate: value, term: state.loan_sba_rate, amount: state.sbaLoanPayment}}
      break
      case 'loan_sba_term': payload = {loan_sba: {term: value, rate: state.loan_sba_rate, amount: state.sbaLoanPayment}}
      break
      case 'additional_loan_amount': payload = {additional_loan: {amount: value, rate: state.loan_sba_rate, term: state.loan_sba_term}}
      break
      case 'additional_loan_rate': payload = {additional_loan: {rate: value, term: state.additional_loan_term, amount: state.additionalLoanPayment}}
      break
      case 'additional_loan_term': payload = {additional_loan: {term: value, rate: state.additional_loan_rate, amount: state.additionalLoanPayment}}
      break
      }

      const updated = await updateBusiness(businessid || "", payload);
      console.log("updated", updated);
      
  }

  const metricCards = cardOrder.map((id) => ({
    id,
    name: id.replace(/([A-Z])/g, " $1"), // Convert camelCase to readable text
    value: state[id as keyof typeof state],
  }));

  const updateState = async (key: string, value: number | string) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
    await updateStateBackend(key, value as number)
  };

  

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newOrder = Array.from(cardOrder);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);

    setCardOrder(newOrder);
  };

  const renderCard = (id: string) => {
    switch (id) {
      case "currentCashflow":
        return (
          <Card
            value={state.currentCashflow}
            onSave={(value) => updateState("currentCashflow", value)}
          >
            <CurrentCashflow updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "expectedSalary":
        return (
          <Card
            value={state.expectedSalary}
            onSave={(value) => updateState("expectedSalary", value)}
          >
            <ExpectedSalary updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "grossRevenue":
        return (
          <Card
            value={state.grossRevenue}
            onSave={(value) => updateState("grossRevenue", value)}
          >
            <GrossRevenue updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "askingPrice":
        return (
          <Card
            value={state.askingPrice}
            onSave={(value) => updateState("askingPrice", value)}
          >
            <AskingPrice updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "sde":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <SDE state={state} updateState={updateState} />
          </Card>
        );
      case "DSCRCalculator":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <DSCRCalculator state={state} updateState={updateState} />
          </Card>
        );
      case "ProjectedCashflow":
        return (
          <Card
            value={state.projectedCashflow}
            onSave={(value) => updateState("projectedCashflow", value)}
          >
            <ProjectedCashflow state={state} updateState={updateState} />
          </Card>
        );
      case "GrossMultiple":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <GrossMultiple state={state} updateState={updateState} />
          </Card>
        );
      case "SDEMultiple":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <SDEMultiple state={state} updateState={updateState} />
          </Card>
        );
      case "SBALoanPayment":
        return (
          <Card
            value={state.sbaLoanPayment}
            onSave={(value) => updateState("sbaLoanPayment", value)}
          >
            <SBALoanPayment updateLoanSba={updateLoanSba} state={state} updateState={updateState} />
          </Card>
        );
      case "AdditionalLoanPayment":
        return (
          <Card
            value={state.additionalLoanPayment}
            onSave={(value) => updateState("additionalLoanPayment", value)}
          >
            <AdditionalLoanPayment updateAdditionalLoan={updateLoanAdditionalLoan} state={state} updateState={updateState} />
          </Card>
        );
      case "TotalDebtPayments":
        return (
          <Card
            value={state.totalDebtPayments}
            onSave={(value) => updateState("totalDebtPayments", value)}
          >
            <TotalDebtPayments state={state} updateState={updateState} />
          </Card>
        );
      case "ProjectedNetProfitMargin":
        return (
          <Card
            value={state.sde}
            onSave={(value) => updateState("sde", value)}
          >
            <ProjectedNetProfitMargin state={state} updateState={updateState} />
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <TopBar data={businessData} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="metrics-grid">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "12px",
                padding: "12px",
                minHeight: "100px",
              }}
              className="bg-blue-50 rounded-lg"
            >
              {metricCards
                .filter(
                  (card) =>
                    ![
                      "sba_loan_amount",
                      "sba_loan_rate",
                      "sba_loan_term",
                      "additional_debt",
                      "additional_loan_amount",
                      "additional_loan_rate",
                      "additional_loan_term",
                      "growth_rate",
                    ].includes(card.id)
                )
                .map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <div {...provided.dragHandleProps} className="h-full">
                          {renderCard(card.id)}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Card
            value={state.customMetric}
            onSave={(value) => updateState("customMetric", value)}
          >
            <NotesComponent state={state} updateState={updateState} />
          </Card>
          <Card
            value={state.customMetric}
            onSave={(value) => updateState("customMetric", value)}
          >
            <CustomMetric state={state} updateState={updateState} />
          </Card>
    </div>
  );
};

export default App;
