import React from 'react';
import { useToast } from 'native-base';

interface Props {
    text: string;
}

const customToast = ({ text }: Props) => {
    const toast = useToast();
};
