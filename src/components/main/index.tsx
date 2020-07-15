import './style.scss';

import React, { useState, useMemo, useCallback } from 'react'
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"


const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const dvt = 1000000;

// http://ketoanthienung.com/cach-tinh-thue-thu-nhap-ca-nhan.htm
const gtbt = 11 * dvt;
const gtpt = 4.4 * dvt;

// https://ebh.vn/nghiep-vu-tong-hop/ty-le-dong-bao-hiem-xa-hoi-muc-luong-dong-bhxh-moi-nhat-2019
const bhyt = 1.5 / 100; // 1.5%
const bhtn = 1 / 100; // 1%
const bhxh = 8 / 100; // 8 %

export default () => {

  const [giamTruBanThan, setGiamTruBanThan] = useState(gtbt)
  const [giamTruPhuThuoc, setGiamTruPhuThuoc] = useState(gtpt)

  const [totalIncome, setTotalIncome] = useState(17137032)
  const [nguoiPhuThuoc, setNguoiPhuThuoc] = useState(0)

  const tongThuNhapChiuThue = useMemo(() => totalIncome, [totalIncome]);

  const dongBhyt = useMemo(() => tongThuNhapChiuThue * bhyt, [tongThuNhapChiuThue])
  const dongBhtn = useMemo(() => tongThuNhapChiuThue * bhtn, [tongThuNhapChiuThue])
  const dongBhxh = useMemo(() => tongThuNhapChiuThue * bhxh, [tongThuNhapChiuThue])
  const tongBaoHiem = useMemo(() => dongBhtn + dongBhxh + dongBhyt, [dongBhtn, dongBhxh, dongBhyt])

  const mienGiamThue = useMemo(() => giamTruBanThan + (giamTruPhuThuoc * nguoiPhuThuoc), [nguoiPhuThuoc, giamTruPhuThuoc, giamTruBanThan])
  const cacKhoanGiamTru = useMemo(() => mienGiamThue + tongBaoHiem, [mienGiamThue, tongBaoHiem])
  const thuNhapTinhThue = useMemo(() => tongThuNhapChiuThue - cacKhoanGiamTru, [tongThuNhapChiuThue, cacKhoanGiamTru])
  const thueSuat = useMemo(() => {
    const dvtTr = thuNhapTinhThue / dvt;

    if (dvtTr < 5) {
      return 5 / 100;
    }
    if (dvtTr > 5 && dvtTr <= 10) {
      return 10 / 100;
    }
    if (dvtTr <= 18 && dvtTr > 10) {
      return 15 / 100;
    }
    if (dvtTr <= 32 && dvtTr > 18) {
      return 20 / 100;
    }
    if (dvtTr <= 52 && dvtTr > 32) {
      return 25 / 100;
    }
    if (dvtTr <= 80 && dvtTr > 52) {
      return 30 / 100;
    }
    if (dvtTr > 80) {
      return 35 / 100;
    }

    return 0
  }, [thuNhapTinhThue])

  const thuePhaiNop = useMemo(() => {
    const dvtTr = thuNhapTinhThue / dvt;

    if (dvtTr < 5) {
      return thuNhapTinhThue * (5 / 100);
    }
    if (dvtTr > 5 && dvtTr <= 10) {
      return thuNhapTinhThue * (10 / 100) - 0.25 * dvt;
    }
    if (dvtTr <= 18 && dvtTr > 10) {
      return thuNhapTinhThue * (15 / 100) - 0.75 * dvt;
    }
    if (dvtTr <= 32 && dvtTr > 18) {
      return thuNhapTinhThue * (20 / 100) - 1.65 * dvt;
    }
    if (dvtTr <= 52 && dvtTr > 32) {
      return thuNhapTinhThue * (25 / 100) - 3.25 * dvt;
    }
    if (dvtTr <= 80 && dvtTr > 52) {
      return thuNhapTinhThue * (30 / 100) - 5.85 * dvt;
    }
    if (dvtTr > 80) {
      return thuNhapTinhThue * (35 / 100) - 9.85 * dvt;
    }

    return 0
  }, [thuNhapTinhThue])

  const displayCurrency = useCallback((value: number) => {
    if (value > 0) {
      return formatter.format(value)
    }
    return 0
  }, [])

  return <div className="p-2">
    <Container>
      <Row>
        <Col>
          <h2>Tạm tính Thuế Thu Nhập Cá Nhân</h2>
          <Form.Text className="text-muted"> Từ ngày 1/7/2020, theo Nghị quyết 954/2020/UBTVQH14, có hiệu lực thi hành từ ngày 01 tháng 7 năm 2020 và áp dụng từ kỳ tính thuế năm 2020. </Form.Text>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={{ offset: 0, span: 6 }}>
          <Row>
            <Col>
              <Form.Group controlId="form-input">
                <Form.Label>Tổng thu nhập chịu thuế</Form.Label>
                <InputGroup>
                  <Form.Control type="number" placeholder="Tong thu nhap chiu thue" value={totalIncome} onChange={(evt: any) => setTotalIncome(Number(evt.target.value))} />
                  <InputGroup.Prepend>
                    <InputGroup.Text>VND</InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
                {/* <Form.Text className="text-muted">Tong thu nhap chiu thue </Form.Text> */}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Số người phụ thuộc </Form.Label>
              <Form.Control type="number" placeholder="Tong thu nhap chiu thue" value={nguoiPhuThuoc} onChange={(evt: any) => setNguoiPhuThuoc(Number(evt.target.value))} />
            </Col>
          </Row>
        </Col>

        <Col xs={{ offset: 3, span: 3 }} >
          <Row>
            <Col>
              <Form.Label>Giảm trừ bản thân </Form.Label>
              <Form.Control type="number" placeholder="Tong thu nhap chiu thue" value={giamTruBanThan} onChange={(evt: any) => setGiamTruBanThan(Number(evt.target.value))} />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Label>Giảm trừ người phụ thuộc </Form.Label>
              <Form.Control type="number" placeholder="Tong thu nhap chiu thue" value={giamTruPhuThuoc} onChange={(evt: any) => setGiamTruPhuThuoc(Number(evt.target.value))} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>


    <Container className="mt-5">
      <Alert variant="primary"><h5>Các loại bảo hiểm bắt buộc </h5></Alert>
      <Row>
        <Col>BHYT ({bhyt * 100} %)</Col>
        <Col className="text-right">{displayCurrency(dongBhyt)}</Col>
      </Row>
      <Row>
        <Col>BHTN ({bhtn * 100} %)</Col>
        <Col className="text-right">{displayCurrency(dongBhtn)}</Col>
      </Row>
      <Row>
        <Col>BHXH ({bhxh * 100} %)</Col>
        <Col className="text-right">{displayCurrency(dongBhxh)}</Col>
      </Row>
    </Container>

    <Container className="mt-3">
      <Alert variant="primary"><h5>Tính thuế</h5></Alert>
      <Row>
        <Col>Thu nhập không tính thuế</Col>
        <Col className="text-right">{displayCurrency(mienGiamThue)}</Col>
      </Row>
      <Row>
        <Col>Thu nhập tính thuế</Col>
        <Col className="text-right">{displayCurrency(thuNhapTinhThue)}</Col>
      </Row>
      <Row>
        <Col>Mức thuế</Col>
        <Col className="text-right">{(thueSuat * 100).toFixed(2)} %</Col>
      </Row>
      <Row>
        <Col>Thuế phải nộp </Col>
        <Col className="text-right">{displayCurrency(thuePhaiNop)}</Col>
      </Row>
    </Container>

    <Container className="mt-3">
      <Alert variant="primary"><h5>Tiền thực lãnh </h5></Alert>
      <Row>
        <Col>Tiền có thể mang về nhà </Col>
        <Col className="text-danger text-right">{displayCurrency(tongThuNhapChiuThue - thuePhaiNop - tongBaoHiem)}</Col>
      </Row>
    </Container>
  </div>
}