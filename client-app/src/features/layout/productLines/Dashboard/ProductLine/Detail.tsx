import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js";

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale)
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import "chart.js/auto"


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../../Charts/ProductLineChart";

import { Bar, Line } from "react-chartjs-2";
import { useStore } from "../../../../../app/stores/store";
import { ChartData } from "../../../../../app/models/chartdata";
function ProductLineDashBoard() {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name:string) => {
    setbigChartData(name);
  };
  const {productionRecordStore,productLineStore,purchaseOrderStore} = useStore();
  const { dayData,monthData,yearData} = productionRecordStore;
  const {getCountryData} = purchaseOrderStore;
  const {choosingLine} = productLineStore;
  const [data,setData] = useState<ChartData>({data:[],labels:[]});
  const [countries,setCountries] = useState<ChartData>({data:[],labels:[]})
   useEffect(()=> {
    fetchDayData();
    // fetchCountries();
  },[choosingLine])

  const fetchCountries = async () => {
      try {
          await getCountryData(choosingLine!.productId!).then((response)=>{    
            console.log(response);
             
            setCountries(response!)
          }).catch((error)=>{
            console.log(error);
            
          })
      } 
      catch {

      }
  }

  const fetchDayData = async () => {
    setBgChartData("data1");
    try {
      await dayData({
        date: new Date(),
        productId: choosingLine!.productId!
      }).then((response) => {
        console.log(response);
        
        setData(response!)
      }).catch((error)=> {
        console.log(error);
        
      });
      
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };
  const fetchMonthData = async () => {
    setBgChartData("data2");
    try {
      await monthData({
        date: new Date(),
        productId: choosingLine!.productId!
      }).then((response) => {
        console.log(response);
        
        setData(response!)
      }).catch((error)=> {
        console.log(error);
        
      });
      
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };
  const fetchYearData = async () => {
    setBgChartData("data3");
    try {
      await yearData({
        date: new Date(),
        productId: choosingLine!.productId!
      }).then((response) => {
        console.log(response);
        
        setData(response!)
      }).catch((error)=> {
        console.log(error);
        
      });
      
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={fetchDayData}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Day
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={fetchMonthData}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Month
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={fetchYearData}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Year
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                      <Line options={chartExample1.options} data={chartExample1.data(data!)}/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                        <Line options={chartExample2.options} data={chartExample2.data()}/>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Countries</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                        <Bar options={chartExample3.options} data={chartExample3.data}/>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Purchase Orders</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" />
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                   <Line options={chartExample4.options} data={chartExample4.data}/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Tasks(5)</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Product complete today</p>
                          <p className="text-muted">
                            15000
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Product's Completion at 18h</p>
                          <p className="text-muted">
                            1200
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>                     
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Most Productive Individuals</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th className="text-center">Products</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td className="text-center">738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td className="text-center">719</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td className="text-center">642</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td className="text-center">635</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td className="text-center">$635</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td className="text-center">615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td className="text-center">605</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductLineDashBoard;
