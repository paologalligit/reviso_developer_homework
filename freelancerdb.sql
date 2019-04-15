--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.8
-- Dumped by pg_dump version 9.6.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: collaborations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collaborations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    budget numeric NOT NULL,
    vat numeric NOT NULL,
    penalty numeric NOT NULL,
    date timestamp with time zone NOT NULL,
    start_hour time without time zone,
    end_hour time without time zone,
    payment numeric,
    due_date timestamp with time zone,
    sent boolean DEFAULT false,
    delay integer,
    customer_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer
);


ALTER TABLE public.collaborations OWNER TO postgres;

--
-- Name: collaborations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collaborations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collaborations_id_seq OWNER TO postgres;

--
-- Name: collaborations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collaborations_id_seq OWNED BY public.collaborations.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    specialization character varying(255),
    city character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    postal integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    birthdate date NOT NULL,
    country character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    postal integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: collaborations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborations ALTER COLUMN id SET DEFAULT nextval('public.collaborations_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: collaborations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collaborations (id, name, budget, vat, penalty, date, start_hour, end_hour, payment, due_date, sent, delay, customer_id, created_at, updated_at, user_id) FROM stdin;
14	Vediamo un po	9999	9	9	2019-04-01 15:51:07.489+02	15:51:07	15:51:07	\N	\N	f	\N	4	2019-04-01 15:51:16.644+02	2019-04-06 16:40:03.278+02	3
12	Breaking bad	1000	45	12	2019-04-01 15:14:22.742+02	14:14:00	15:14:22	\N	\N	f	\N	4	2019-04-01 15:14:43.592+02	2019-04-06 16:40:19.72+02	3
11	Atlantide	10000	100	10	2019-03-28 10:34:37.834+01	10:34:37	10:34:37	\N	\N	f	\N	4	2019-03-28 10:36:11.665+01	2019-04-06 16:41:12.044+02	3
13	New project	4500	125	11	2019-04-01 15:19:21.208+02	15:19:21	15:19:21	\N	\N	f	\N	8	2019-04-01 15:20:11.879+02	2019-04-06 16:41:19.48+02	3
15	Nuovo	1540	308	1225	2019-04-07 08:11:14.409+02	08:11:14	08:11:14	\N	\N	f	\N	11	2019-04-07 08:11:56.316+02	2019-04-07 08:11:56.316+02	3
16	Nuovo bis	544	21.76	54	2019-04-07 08:12:35.919+02	08:12:35	08:12:35	\N	\N	f	\N	9	2019-04-07 08:12:56.214+02	2019-04-07 08:13:03.622+02	3
19	Ampliamento cucina 	2000	400	14	2019-04-10 16:46:13.082+02	16:46:13	16:46:13	\N	\N	f	\N	3	2019-04-10 16:47:11.142+02	2019-04-10 16:47:11.142+02	2
17	Pulizia scale	124	24.8	12	2019-04-07 08:14:23.876+02	08:14:23	08:14:23	\N	\N	f	\N	12	2019-04-07 08:15:10.192+02	2019-04-14 15:37:52.221+02	2
18	Costruzione muro	1500	150	55	2019-04-10 16:43:05.086+02	16:43:05	16:43:05	\N	\N	t	\N	15	2019-04-10 16:43:47.529+02	2019-04-14 15:46:46.795+02	2
20	Errore costruzione	2500	250	12	2019-04-10 17:01:30.296+02	16:01:00	17:01:30	\N	\N	t	\N	15	2019-04-10 17:02:09.068+02	2019-04-15 11:35:31.674+02	2
21	Registrazione voce	150	30	55	2019-04-26 00:00:00+02	15:38:00	18:38:00	\N	\N	f	\N	19	2019-04-15 11:41:02.677+02	2019-04-15 11:41:02.677+02	2
\.


--
-- Name: collaborations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collaborations_id_seq', 21, true);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, name, surname, country, email, specialization, city, address, postal, created_at, updated_at, user_id) FROM stdin;
1	Fuffolo	Baffo	i	baffo@email.com	i	i	i	9	2019-03-25 15:04:01.831+01	2019-03-25 15:04:01.831+01	1
3	Impostore	Salvo	jkl	baffo@email.com	jkl	jkl	jkl	9	2019-03-25 15:15:29.492+01	2019-03-25 15:15:29.492+01	2
4	GianRoberto	Cazzola	hjkdu	cazzola@email.com	nessuna	hidkj	via scemo	12	2019-03-28 10:27:55.969+01	2019-03-28 10:27:55.969+01	3
5	fdsajkl	jkl	jkl	ldfjklas@email.com	jklò	fdas	jklò	89	2019-03-30 16:21:58.306+01	2019-03-30 16:21:58.306+01	1
6	hjikljhjk	jhklhjlb	hjk	iougbi@e.com	hbko	gfdhj	hnjk	9	2019-03-30 16:23:08.292+01	2019-03-30 16:23:08.292+01	1
7	llll	lllll	jklhjk	ooo@io.io	kgj	gjkgjk	gbkj	8	2019-03-30 16:27:17.72+01	2019-03-30 16:27:17.72+01	1
8	Kira	Bello	Japan	bello@email.com	killer	Tokyo	via dell'albero bello	89	2019-04-01 15:20:04.428+02	2019-04-01 15:20:04.428+02	3
9	Nessuno	Polifemo	jkl	polifemo@email.com	jkl	jkl	jhkl	8	2019-04-01 16:23:34.218+02	2019-04-01 16:23:34.218+02	3
10	Pupillo	Brando	jklll	bra@email.com	nod	lllijkkhj	jhfkdslaklk	8900	2019-04-05 18:12:40.238+02	2019-04-05 18:12:40.238+02	1
11	Pollo	Fino	c	finopollo@email.com		b	g	6	2019-04-07 08:11:50.838+02	2019-04-07 08:11:50.838+02	3
12	Nuccio	Cardarelli	huk	nu@email.com		kdu	klj	8989	2019-04-07 08:14:57.679+02	2019-04-07 08:14:57.679+02	2
13	Luca	Buono	jkl	luca@email.com		jkl	jkl	89	2019-04-07 09:03:01.494+02	2019-04-07 09:03:01.494+02	2
14	Adolfo	Spruzzi	com	spu@email.com		it	kkkl	87	2019-04-07 09:04:21.737+02	2019-04-07 09:04:21.737+02	2
15	Prova	Errore	jkl	error@email.com		jkl	jkl	98	2019-04-07 09:30:28.827+02	2019-04-07 09:30:28.827+02	2
16	Customer	Customino	jkl	custo@email.com		jkl		8977	2019-04-07 09:31:23.616+02	2019-04-07 09:31:23.616+02	2
17	Undef	Finded	ujkl	undef@email.com		jkl	hjvsdk	899	2019-04-07 09:34:23.563+02	2019-04-07 09:34:23.563+02	2
19	Baffo	Banfi	jkl	baffo_banfi@email.com		jkl	jkl	9	2019-04-15 11:40:15.051+02	2019-04-15 11:40:15.051+02	2
20	Baffo	Banfi	jkl	baffo@email.com	j	jkl	jkl	9	2019-04-15 11:42:43.427+02	2019-04-15 11:42:43.427+02	3
23	Il	Bello	jkl	bello@email.com		jkl	jkl	54	2019-04-15 12:06:53.5+02	2019-04-15 12:06:53.5+02	10
27	La	Ranocchia	jkl	rana@email.com	Cucina	jkl	via ciao, 88	90	2019-04-15 12:15:56.235+02	2019-04-15 12:15:56.235+02	10
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 27, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, username, email, birthdate, country, password, city, address, postal, created_at, updated_at) FROM stdin;
1	Johnny	Bravo	cool	cool@email.com	2019-01-01	Italy	$2b$12$6nVCIwHp8uIfvnKJRzNA0.vXpfr02x7EyDqsBESYVJulBpkVzUEC.	Milan	Bello	32010	2019-03-25 15:03:14.598+01	2019-03-25 15:03:14.598+01
2	Giorgio	Kelli	kelli	kelli@email.com	2019-01-01	jkl	$2b$12$8T2xnbEKt/WNxL4TuRh3BOf01JfuqS3rTDUARalK71la/FGGOZ6sC	jkl	jkl	9	2019-03-25 15:14:57.089+01	2019-03-25 15:14:57.089+01
3	Lorenzo	Uppolo	uppolo	uppo@email.com	2019-01-01	Italy	$2b$12$M83hlIYnLGFXKlCe0pFJXuqGek1nAia4azVqY6EqWkv9vc1EZz9q6	Florence	via ciao	1200	2019-03-28 10:17:42.155+01	2019-03-28 10:17:42.155+01
4	Claudio	Lippi	Clauditone456	cit456@email.com	2000-12-31	Italy	$2b$12$6M8M28iAJeNgjplNPMZ9auKeFAUxORIMETYa1Oa7zaflSUKgPfjnC	Milan	Via Dei Rognosi	20100	2019-03-31 10:08:23.784+02	2019-03-31 10:08:23.784+02
8	Claudio	Lippi	Clauditone45116	c4it456@email.com	2000-12-31	Italy	$2b$12$jyOzTDsT6voqdXpjvWCLr.uzmHMz0yUJYsVkj0EMi5bWuR1O6pcT2	Milan	Via Dei Rognosi	20100	2019-03-31 10:25:45.984+02	2019-03-31 10:25:45.984+02
10	Sandro	Puppo	puppo	puppo@email.com	2019-01-01	i	$2b$12$az9PRFaMFpjmLFCOn4CG.OOPOwPJAcEd9SQHV/p6rrYOyTLKsvsd2	i	i	4	2019-04-15 11:58:03.874+02	2019-04-15 11:58:03.874+02
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: collaborations collaborations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: customers_email_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customers_email_user_id ON public.customers USING btree (email, user_id);


--
-- Name: collaborations collaborations_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: collaborations collaborations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: customers customers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

