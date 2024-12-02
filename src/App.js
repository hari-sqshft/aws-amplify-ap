import './App.css';
import { Badge, Button, Card, Flex, Image, Input, StepperField, Tabs, Text, TextAreaField, View, withAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { signOut } from 'aws-amplify/auth';
import { get } from "aws-amplify/api";

function App() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');


  const handleAddItem = () => {
    console.log({
      name, description, price
    })
  }

  useEffect(() => {

    async function getData() {
      const { response } = get({ apiName: 'produtsapi', path: '/products/name', options: { headers: { 'Content-Type': 'application/json', } } });
      try {
        await response;
      } catch (e) {
        console.log(e)
      }
    }
    getData();
  }, [])


  const ViewItems = () => {
    return [1, 2, 3].map(() => {
      return (
        <Card variation="elevated" style={{ margin: "10px 5px" }}>
          <Flex alignItems="flex-start">
            <Image src="https://ui.docs.amplify.aws/amplify-placeholder.svg"
              alt="Amplify" width="8rem" />
            <Flex direction="column" gap="xs">
              <Flex>
                <Badge variation="success">New</Badge>
              </Flex>
              <Text fontSize="large" fontWeight="semibold">
                Product title
              </Text>
              <Text color="font.tertiary">
                Product description
              </Text>
              <Text
                fontSize="large"
                color="secondary">
                $199.99
              </Text>
              <Flex>
                <StepperField
                  label="Quantity"
                  min={0}
                  max={10}
                  step={1}
                  defaultValue={1}
                  labelHidden
                />
                <Button variation="primary">Add to cart</Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      )
    })
  }

  const AddItems = () => {
    return (
      <View margin={20} >
        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          alignContent="flex-start"
          wrap="nowrap"
          gap="2rem"
        >
          <Input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextAreaField
            value={description}
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            rows={3} />
          <Input
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            variation="primary"
            loadingText=""
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </Flex>
      </View>
    )
  }

  return (
    <div>
      <Flex direction="row-reverse" padding={"0.5rem"}>
        <Button
          variation="primary"
          style={{
            padding: '10px 20px',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={signOut}
        >
          Sign Out
        </Button>
      </Flex>

      <Tabs
        spacing="relative"
        justifyContent="space-between"
        defaultValue='viewItem'
        items={[
          { label: 'View Items', value: 'viewItem', content: ViewItems() },
          { label: 'Add Item', value: 'addItem', content: AddItems() }
        ]}
      />
    </div>
  );
}

export default withAuthenticator(App);
