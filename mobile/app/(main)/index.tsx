import { ScrollView, StyleSheet, Linking} from "react-native";
import ThemedView from "../../components/ThemedView";
import Header from "../../components/ui/partials/header";
import Products from "../../components/ui/products/Products";
import { useEffect, useState } from "react";
import { fetchData } from "../../services/api";
import TabButton from "../../components/ui/TabButton";

const Index = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('All');

    useEffect(() => {
        const getTags = async () => {
            const response = await fetchData('/api/tag');
            if(response.success) setTags(response.tags)
        }

        getTags();
    }, [])

    return (
        <ThemedView style={styles.container}>
            <Header setSearchTerm={setSearchTerm}/>
            <ScrollView style={{ paddingHorizontal: 10, maxHeight: 40, marginBottom: 10}} horizontal showsHorizontalScrollIndicator={false}>
                <TabButton 
                    badge={''}
                    label={'All'}
                    isSelected={selectedTag === 'All'}
                    onPress={() => {
                        setSearchTerm('')
                        setSelectedTag('All')
                    }}
                    style={{ marginRight: 10 }}
                />
                {tags.map((tag, index) => {
                return <TabButton 
                    key={index}
                    badge={''}
                    label={tag.tagName}
                    isSelected={selectedTag === tag.tagName}
                    onPress={() => {
                        setSearchTerm(tag.tagName)
                        setSelectedTag(tag.tagName)
                    }}
                    style={{ marginRight: 10 }}
                />
                })}
            </ScrollView>
            <ScrollView  
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