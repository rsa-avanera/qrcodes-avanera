import React, { useState } from 'react';
import { InputField } from './components/InputField';
import { QRCode } from 'react-qrcode-logo';
import { SelectField } from './components/SelectField';
import { TextArea } from './components/TextArea';
import { ImageUploadField } from './components/ImageUploadField';
import { CheckboxField } from './components/CheckboxField';
import ReactJson from 'react-json-view';
import html2canvas from 'html2canvas';
import { defaultState } from './defaultState';

export enum AvaneraColor {
  ContrastGrey = '#0c1229',
  TrustPurple = '#192356',
  VisionPurple = '#5041ed',
  White = '#f4f4f4',
  WarmLightgrey = '#ffffff',
  FadedBlue = '#e0f5ff',
  SoftPurple = '#8d84f3',
  SustainabilityLime = '#e0ff65',
}

export const isAvaneraColor = (hexColor: string) =>
  Object.values(AvaneraColor).includes(hexColor as AvaneraColor);

export const getColorLabel = (hexColor: string) =>
  Object.keys(AvaneraColor)[
    Object.values(AvaneraColor).indexOf(hexColor as AvaneraColor)
  ];

const App: React.FC = () => {
  const [state, setState] = useState<{ [key: string]: any }>(defaultState);

  const handleChange = ({ target }: any) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleQRCodeDownload = () => {
    html2canvas(document.querySelector('#react-qrcode-logo') as any).then(
      function (canvas) {
        const link = document.createElement('a');
        link.download = 'react-qrcode-logo.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    );
  };

  const handleJSONDownload = () => {
    const qrCodeProperties = { ...state };
    delete qrCodeProperties.logoImage;
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(qrCodeProperties)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'qr_code_properties.json';

    link.click();
  };

  const buildEyeRadiusInput = (id: string) => {
    return (
      <div>
        <InputField
          name={id}
          type="text"
          handleChange={handleChange}
          min={0}
          max={50}
          hideLabel
          value={(state as any)[id]}
        />
        <InputField
          name={id}
          type="range"
          handleChange={handleChange}
          min={0}
          max={50}
          hideLabel
          value={(state as any)[id]}
        />
      </div>
    );
  };

  return (
    <div className="app">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderBottom: '2px solid black',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '700px',
            overflowY: 'scroll',
            padding: '32px',
            flex: 1,
          }}
        >
          <h2>Logo and Color Properties </h2>
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
              }}
            >
              <TextArea
                name="value"
                handleChange={handleChange}
                value={state.value}
              />
              <SelectField
                name="ecLevel"
                options={['L', 'M', 'Q', 'H']}
                handleChange={handleChange}
                value={state.ecLevel}
              />
              <CheckboxField
                name="enableCORS"
                handleChange={handleChange}
                value={state.enableCORS}
              />
              <InputField
                name="size"
                type="text"
                handleChange={handleChange}
                value={state.size}
              />
              <InputField
                name="size"
                type="range"
                min={100}
                max={512}
                handleChange={handleChange}
                value={state.size}
              />
              <InputField
                name="quietZone"
                type="text"
                handleChange={handleChange}
                value={state.quietZone}
              />
              <InputField
                name="quietZone"
                type="range"
                handleChange={handleChange}
                value={state.quietZone}
                min={20}
                max={80}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '4px',
                  justifyContent: 'space-around',
                }}
              >
                <SelectField
                  name="bgColor"
                  options={[...Object.values(AvaneraColor), '#000000']}
                  handleChange={handleChange}
                  value={state.bgColor}
                />
                <InputField
                  name="bgColor"
                  type="color"
                  handleChange={handleChange}
                  value={state.bgColor}
                />
                <SelectField
                  name="fgColor"
                  options={[...Object.values(AvaneraColor), '#000000']}
                  handleChange={handleChange}
                  value={state.fgColor}
                />
                <InputField
                  name="fgColor"
                  type="color"
                  handleChange={handleChange}
                  value={state.fgColor}
                />
              </div>
            </div>
            <div
              style={{
                width: '240px',
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
              }}
            >
              <ImageUploadField name="logoImage" handleChange={handleChange} />
              <InputField
                name="logoWidth"
                type="text"
                handleChange={handleChange}
                value={state.logoWidth}
              />
              <InputField
                name="logoWidth"
                type="range"
                handleChange={handleChange}
                value={state.logoWidth}
                min={20}
                max={500}
              />
              <InputField
                name="logoHeight"
                type="text"
                handleChange={handleChange}
                value={state.logoHeight}
              />
              <InputField
                name="logoHeight"
                type="range"
                handleChange={handleChange}
                min={20}
                max={500}
                value={state.logoHeight}
              />
              <InputField
                name="logoOpacity"
                type="number"
                handleChange={handleChange}
                value={state.logoOpacity}
                min={0}
                max={1}
                step={0.05}
              />
              <InputField
                name="logoOpacity"
                type="range"
                handleChange={handleChange}
                min={0}
                max={1}
                step={0.05}
                value={state.logoOpacity}
              />
              <SelectField
                name="qrStyle"
                options={['squares', 'dots']}
                handleChange={handleChange}
                value={state.qrStyle}
              />
              <CheckboxField
                name="removeQrCodeBehindLogo"
                value={state.removeQrCodeBehindLogo}
                handleChange={handleChange}
              />
              <InputField
                name="logoPadding"
                type="text"
                handleChange={handleChange}
                min={0}
                max={20}
                step={1}
                value={state.logoPadding}
              />
              <InputField
                name="logoPadding"
                type="range"
                handleChange={handleChange}
                min={0}
                max={20}
                step={1}
                value={state.logoPadding}
              />
              <SelectField
                name="logoPaddingStyle"
                options={['square', 'circle']}
                handleChange={handleChange}
                value={state.logoPaddingStyle}
              />
            </div>
          </div>
          <div style={{ padding: '15px' }}>
            <h2>EyeRadius Properties </h2>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: 18 }}>Top left eye</h4>
                <p style={{ fontSize: 16 }}>Outer</p>
                {buildEyeRadiusInput('eyeradius_0_outer_0')}
                {buildEyeRadiusInput('eyeradius_0_outer_1')}
                {buildEyeRadiusInput('eyeradius_0_outer_2')}
                {buildEyeRadiusInput('eyeradius_0_outer_3')}
                <p style={{ fontSize: 16 }}>Inner</p>
                {buildEyeRadiusInput('eyeradius_0_inner_0')}
                {buildEyeRadiusInput('eyeradius_0_inner_1')}
                {buildEyeRadiusInput('eyeradius_0_inner_2')}
                {buildEyeRadiusInput('eyeradius_0_inner_3')}
              </div>
              <div>
                <h4 style={{ fontSize: 18 }}>Top right eye</h4>
                <p style={{ fontSize: 16 }}>Outer</p>
                {buildEyeRadiusInput('eyeradius_1_outer_0')}
                {buildEyeRadiusInput('eyeradius_1_outer_1')}
                {buildEyeRadiusInput('eyeradius_1_outer_2')}
                {buildEyeRadiusInput('eyeradius_1_outer_3')}
                <p style={{ fontSize: 16 }}>Inner</p>
                {buildEyeRadiusInput('eyeradius_1_inner_0')}
                {buildEyeRadiusInput('eyeradius_1_inner_1')}
                {buildEyeRadiusInput('eyeradius_1_inner_2')}
                {buildEyeRadiusInput('eyeradius_1_inner_3')}
              </div>
              <div>
                <h4 style={{ fontSize: 18 }}>Bottom left eye</h4>
                <p style={{ fontSize: 16 }}>Outer</p>
                {buildEyeRadiusInput('eyeradius_2_outer_0')}
                {buildEyeRadiusInput('eyeradius_2_outer_1')}
                {buildEyeRadiusInput('eyeradius_2_outer_2')}
                {buildEyeRadiusInput('eyeradius_2_outer_3')}
                <p style={{ fontSize: 16 }}>Inner</p>
                {buildEyeRadiusInput('eyeradius_2_inner_0')}
                {buildEyeRadiusInput('eyeradius_2_inner_1')}
                {buildEyeRadiusInput('eyeradius_2_inner_2')}
                {buildEyeRadiusInput('eyeradius_2_inner_3')}
              </div>
            </div>
          </div>
          <div style={{ padding: '15px' }}>
            <h2>EyeColor Properties</h2>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
              <div>
                <h4 style={{ fontSize: 18 }}>Top left eye</h4>
                <SelectField
                  name="eyecolor_0_outer"
                  options={[...Object.values(AvaneraColor), '#000000']}
                  handleChange={handleChange}
                  value={state.eyecolor_0_outer}
                />
                <InputField
                  name="eyecolor_0_outer"
                  type="color"
                  handleChange={handleChange}
                  hideLabel={true}
                  value={state.eyecolor_0_outer}
                />
                <SelectField
                  name="eyecolor_0_inner"
                  options={[...Object.values(AvaneraColor), '#000000']}
                  handleChange={handleChange}
                  value={state.eyecolor_0_inner}
                />
                <InputField
                  name="eyecolor_0_inner"
                  type="color"
                  handleChange={handleChange}
                  hideLabel={true}
                  value={state.eyecolor_0_inner}
                />
              </div>
              <div>
                <h4 style={{ fontSize: 18 }}>Top right eye</h4>
                <SelectField
                  name="eyecolor_1_outer"
                  options={[...Object.values(AvaneraColor), '#000000']}
                  handleChange={handleChange}
                  value={state.eyecolor_1_outer}
                />
                <InputField
                  name="eyecolor_1_outer"
                  type="color"
                  handleChange={handleChange}
                  hideLabel={true}
                  value={state.eyecolor_1_outer}
                />
                <SelectField
                  name="eyecolor_1_inner"
                  options={[...Object.values(AvaneraColor), '#000000']}
                  handleChange={handleChange}
                  value={state.eyecolor_1_inner}
                />
                <InputField
                  name="eyecolor_1_inner"
                  type="color"
                  handleChange={handleChange}
                  hideLabel={true}
                  value={state.eyecolor_1_inner}
                />
              </div>
              <div>
                <h4 style={{ fontSize: 18 }}>Bottom left eye</h4>
                <SelectField
                  name="eyecolor_2_outer"
                  options={[...Object.values(AvaneraColor), '#000000']}
                  handleChange={handleChange}
                  value={state.eyecolor_2_outer}
                />
                <InputField
                  name="eyecolor_2_outer"
                  type="color"
                  value={state.eyecolor_2_outer}
                  handleChange={handleChange}
                  hideLabel={true}
                />
                <SelectField
                  name="eyecolor_2_inner"
                  options={[...Object.values(AvaneraColor), '#000000']}
                  handleChange={handleChange}
                  value={state.eyecolor_2_inner}
                />
                <InputField
                  name="eyecolor_2_inner"
                  type="color"
                  handleChange={handleChange}
                  hideLabel={true}
                  value={state.eyecolor_2_inner}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: 800,
            height: 800,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #d4fafc',
            backgroundColor: '#d4fafc',
          }}
        >
          <QRCode
            logoOnLoad={() => console.log('logo loaded')}
            {...{
              ...state,
              eyeRadius: [
                // build eyeRadius manually
                {
                  outer: [
                    state.eyeradius_0_outer_0,
                    state.eyeradius_0_outer_1,
                    state.eyeradius_0_outer_2,
                    state.eyeradius_0_outer_3,
                  ],
                  inner: [
                    state.eyeradius_0_inner_0,
                    state.eyeradius_0_inner_1,
                    state.eyeradius_0_inner_2,
                    state.eyeradius_0_inner_3,
                  ],
                },
                {
                  outer: [
                    state.eyeradius_1_outer_0,
                    state.eyeradius_1_outer_1,
                    state.eyeradius_1_outer_2,
                    state.eyeradius_1_outer_3,
                  ],
                  inner: [
                    state.eyeradius_1_inner_0,
                    state.eyeradius_1_inner_1,
                    state.eyeradius_1_inner_2,
                    state.eyeradius_1_inner_3,
                  ],
                },
                {
                  outer: [
                    state.eyeradius_2_outer_0,
                    state.eyeradius_2_outer_1,
                    state.eyeradius_2_outer_2,
                    state.eyeradius_2_outer_3,
                  ],
                  inner: [
                    state.eyeradius_2_inner_0,
                    state.eyeradius_2_inner_1,
                    state.eyeradius_2_inner_2,
                    state.eyeradius_2_inner_3,
                  ],
                },
              ],
              eyeColor: [
                // build eyeColor manually
                {
                  outer: state.eyecolor_0_outer,
                  inner: state.eyecolor_0_inner,
                },
                {
                  outer: state.eyecolor_1_outer,
                  inner: state.eyecolor_1_inner,
                },
                {
                  outer: state.eyecolor_2_outer,
                  inner: state.eyecolor_2_inner,
                },
              ],
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={handleQRCodeDownload}
          style={{ margin: '20px' }}
        >
          Download QR Code
        </button>
        <button
          type="button"
          onClick={handleJSONDownload}
          style={{ margin: '20px' }}
        >
          Download Property JSON
        </button>
        {/* <p>State snapshot (debug purposes)</p>
        <ReactJson src={state} style={{ marginBottom: 40 }} /> */}
      </div>
    </div>
  );
};

export default App;
