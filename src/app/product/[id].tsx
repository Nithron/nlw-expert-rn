import { Image, ScrollView, Text, View } from "react-native";
import {useLocalSearchParams, useNavigation} from 'expo-router'
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { Redirect } from 'expo-router'
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import clsx from "clsx";


export default function Product(){
    const {id} = useLocalSearchParams()
    const cartStore = useCartStore()
    const navigation = useNavigation()

    const product = PRODUCTS.find((item) => item.id === id)

    function handleAddToCart(){
        if(product){
            cartStore.add(product)
            navigation.goBack()
        }
    }

    if(!product) {
        return(<Redirect href='/'/>)
    }

    return(
        <View className='flex-1'>
            <Image source={product.cover} className='w-full h-52' resizeMode="cover"/>


            <ScrollView className='p-5 mt-8 flex-1'>
            <Text className='text-white text-xl font-heading'>{product.title}</Text>
                <Text className='text-lime-400 text-2xl font-heading my-2'>
                    {formatCurrency(product.price)}

                </Text>

                <Text className='text-slate-400 font-body text-base leading-6 mb-6'>
                    {product.description}
                </Text>
                {product.ingredients.map((ingredient, index) =>(
                    <Text 
                        key={ingredient} 
                        className={
                            clsx('text-slate-400 font-body leading-6 text-base',
                            index === product.ingredients.length -1 && 'mb-12')}
                        >
                            {"\u2022"}{ingredient}
                    </Text>
                ))}
            </ScrollView>

            <View className='p-5 pb-8 gap-5'>
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                       <Feather  name='plus-circle' size={20}/> 
                    </Button.Icon>
                    <Button.Text>
                        Adicionar ao pedido
                    </Button.Text>
                </Button>

                <LinkButton title='Voltar ao cardápio' href='/'/>
            </View>

        </View>
    )

}