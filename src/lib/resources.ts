import { RESOURCE_PREVIEWS } from "@/assets/resourcePreviews";

export type UsefulResource = {
  id: string;
  name: string;
  description: string;
  domain: string;
  url: string;
  image: string;
};

export const USEFUL_RESOURCES: UsefulResource[] = [
  {
    id: "talan",
    name: "НБУ — Талан",
    description: "Навчальні матеріали з фінансової грамотності",
    domain: "talan.bank.gov.ua",
    url: "https://talan.bank.gov.ua",
    image: RESOURCE_PREVIEWS.talan,
  },
  {
    id: "harazd",
    name: "Гаразд",
    description: "Фінансова грамотність, управління особистими фінансами",
    domain: "harazd.bank.gov.ua",
    url: "https://harazd.bank.gov.ua",
    image: RESOURCE_PREVIEWS.harazd,
  },
  {
    id: "fincult",
    name: "ФінКульт",
    description: "Матеріали про заощадження, банківські послуги та фінансову безпеку",
    domain: "finclub.net",
    url: "https://finclub.net",
    image: RESOURCE_PREVIEWS.fincult,
  },
  {
    id: "prometheus",
    name: "Prometheus",
    description: "Безкоштовні освітні курси з фінансів та економіки",
    domain: "prometheus.org.ua",
    url: "https://prometheus.org.ua",
    image: RESOURCE_PREVIEWS.prometheus,
  },
  {
    id: "diia-osvita",
    name: "Дія.Освіта",
    description: "Освітні серіали та матеріали з фінансової грамотності",
    domain: "osvita.diia.gov.ua",
    url: "https://osvita.diia.gov.ua",
    image: RESOURCE_PREVIEWS.diiaOsvita,
  },
];
