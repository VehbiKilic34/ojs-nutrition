import { Accordion, Container } from "react-bootstrap";
import type { FAQItem } from "../data/faq";

interface FAQSectionProps {
  faqItems: FAQItem[];
  title?: string;
  showCategories?: boolean;
}

export const FAQSection = ({ 
  faqItems, 
  title = "Sık Sorulan Sorular",
  showCategories = false 
}: FAQSectionProps) => {
  // Kategorilere göre gruplama
  const groupedFAQs = showCategories 
    ? faqItems.reduce((acc, item) => {
        const category = item.category || 'Genel';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {} as Record<string, FAQItem[]>)
    : null;

  return (
    <Container className="py-4">
      <h4 className="mb-4">{title}</h4>
      
      {showCategories && groupedFAQs ? (
        // Kategorilere göre gruplandırılmış FAQ
        Object.entries(groupedFAQs).map(([category, items]) => (
          <div key={category} className="mb-4">
            <h5 className="mb-3">{category}</h5>
            <Accordion>
              {items.map((item) => (
                <Accordion.Item key={item.id} eventKey={item.id.toString()}>
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        ))
      ) : (
        // Basit liste formatında FAQ
        <Accordion>
          {faqItems.map((item) => (
            <Accordion.Item key={item.id} eventKey={item.id.toString()}>
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}; 