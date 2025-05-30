import { useEffect, useState } from "react";
import { View, StyleSheet,  TouchableOpacity, Text} from "react-native";
import { fetchData } from "../../../services/api";
import ProductCard from "./ProductCard";

const Products = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
      const response = await fetchData(`/api/product?page=${page}&limit=50&searchTerm=${searchTerm}`);
      if(response.success) {
        setProducts(response.products.filter(product => product.stock > 0));
        setPage(response.page)
        setTotalPages(response.totalPages)
      }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  if(products.length === 0 && searchTerm) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No results for {searchTerm}</Text>
  </View>

  return (
  <View style={styles.container}>
      {products
        .filter((product) => product.items.length > 0)
        .map((product) => (
          <ProductCard
            key={product.name}
            id={product._id}
            image={product.image}
            rating={product.rating}
            productName={product.name}
            price={Math.min(...product.items.map((item) => item.price))}
            style={{ minHeight: 250, width: "48%" }}
          />
        ))}
        {totalPages !== page && <TouchableOpacity style={{ width: '100%', backgroundColor: '#9137db', padding: 10}}>
          <Text style={{ textAlign: 'center', color: 'white'}}>See more products</Text>
        </TouchableOpacity>}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 20
  },
});