import { ScrollView, StyleSheet, Linking} from "react-native";
import ThemedView from "../../components/ThemedView";
import Header from "../../components/ui/partials/header";
import Products from "../../components/ui/products/Products";
import { useState } from "react";

const Index = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <ThemedView style={styles.container}>
            <Header setSearchTerm={setSearchTerm}/>
            <ScrollView  
                style={{flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Products searchTerm={searchTerm}/>
            </ScrollView>
        </ThemedView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    }
});