import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Modal, TouchableHighlight, View, Alert } from 'react-native';

import {
  Form,
  Item,
  Label,
  Input,
  CardItem,
  Card,
  Left,
  Right,
  Button,
} from 'native-base';

import { getDurationString } from 'common/date';

const EditFast = ({ fast, onCancel, onSave }) => {
  if (!fast) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={fast != null}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={{ marginTop: 22 }}>
        <Card>
          <CardItem header bordered>
            <Text>Edit fast</Text>
          </CardItem>
          <CardItem>
            <Form>
              <Item>
                <Label>Start</Label>
                <Input />
              </Item>
            </Form>
          </CardItem>
          <CardItem footer>
            <Left>
              <Button
                transparent
                onPress={() => {
                  onCancel();
                }}
              >
                <Text>Cancel</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => onSave(fast)}>
                <Text>Save</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </View>
    </Modal>
  );
};

EditFast.propTypes = {
  fast: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditFast;
