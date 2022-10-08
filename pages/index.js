import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as React from 'react'
import { MdSend } from "react-icons/md"

import { Button, Input, Textarea, Container, Loading, Card, Dropdown } from "@nextui-org/react";

export default function Home() {

  const [inputText, setInputText] = React.useState('');
  const [resultText, setResultText] = React.useState('');
  const [translateTo, setTranslateTo] = React.useState("Portuguese");
  const [currentModel, setCurrentModel] = React.useState(new Set(["text-davinci-002"]));
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedValue = React.useMemo(
    () => Array.from(currentModel).join(", ").replaceAll("_", " "),
    [currentModel]
  );

  const handleRequest = async () => {
    setIsLoading(true);
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestText: inputText,
        translateTo: translateTo,
        model: selectedValue,
      }),
    });

    const data = await response.json();

    setResultText(data.response);
    setIsLoading(false);
  }

  const models = [
    { value: "text-davinci-002", label: "Davinci" },
    { value: "text-curie-001", label: "Curie" },
    { value: "text-babbage-001", label: "Babbage" },
    { value: "text-ada-001", label: "Ada" },
  ]

  React.useEffect(() => {
    console.log(currentModel);
    } , [currentModel]);

  return (
    <Container>
      <Head>
        <title>OpenAi Translator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container style={{marginTop: 50}}>

        <div style={{display: "flex", flexDirection: "column", gap: 15}}>

          <h1>OpenAi Translator</h1>
          <Textarea label="What to translate" onChange={(e) => setInputText(e.target.value) } type="text" placeholder='Some text to translate into Portuguese' clearable />
          <Input label="Translate to this language" onChange={(e) => setTranslateTo(e.target.value) } type="text" placeholder='Portuguese' clearable />
          <Dropdown>
            <Dropdown.Button flat>{selectedValue}</Dropdown.Button>
            <Dropdown.Menu  
              onSelectionChange={setCurrentModel}
              selectedKeys={currentModel}
              disallowEmptySelection
              selectionMode='single'
            >
              {models.map(model => (
                <Dropdown.Item key={model.value}>{model.label}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Button color="secondary" icon={<MdSend />} disabled={isLoading} style={{marginTop: 20}} ghost onClick={handleRequest}>{!isLoading ? "Send Request" : <Loading size="xs" />}</Button>
      
        {resultText.length > 0 ?     
        <Card style={{display: "flex", flexDirection: "column"}} >
          <Card.Body>
            {resultText}
          </Card.Body>
        </Card> 
        : null
        }
    
      </Container>
        <div style={{marginLeft: 400, marginTop: 50}}>
        <p>francojmf@2022</p>
        </div>        
      </Container>
      
  )
}
