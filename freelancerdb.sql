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
-- Name: collaborations; Type: TABLE; Schema: public; Owner: paologio
--

CREATE TABLE public.collaborations (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    budget numeric NOT NULL,
    payment numeric,
    vat numeric NOT NULL,
    settled boolean,
    delay integer,
    penalty numeric NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer,
    customer_id integer,
    name character varying NOT NULL,
    start_hour time without time zone NOT NULL,
    end_hour time without time zone NOT NULL,
    due_date timestamp without time zone
);


ALTER TABLE public.collaborations OWNER TO paologio;

--
-- Name: collaborations_id_seq; Type: SEQUENCE; Schema: public; Owner: paologio
--

CREATE SEQUENCE public.collaborations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collaborations_id_seq OWNER TO paologio;

--
-- Name: collaborations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: paologio
--

ALTER SEQUENCE public.collaborations_id_seq OWNED BY public.collaborations.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: paologio
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


ALTER TABLE public.customers OWNER TO paologio;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: paologio
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO paologio;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: paologio
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: paologio
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    username character varying(255),
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


ALTER TABLE public.users OWNER TO paologio;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: paologio
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO paologio;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: paologio
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: collaborations id; Type: DEFAULT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.collaborations ALTER COLUMN id SET DEFAULT nextval('public.collaborations_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: collaborations; Type: TABLE DATA; Schema: public; Owner: paologio
--

COPY public.collaborations (id, date, budget, payment, vat, settled, delay, penalty, created_at, updated_at, user_id, customer_id, name, start_hour, end_hour, due_date) FROM stdin;
3	2019-01-01 01:00:00+01	1200	\N	20	\N	\N	150	2019-03-11 10:58:28.046+01	2019-03-11 10:58:28.046+01	6	7	Project Test	09:30:00	10:30:00	\N
4	2019-01-01 01:00:00+01	12	\N	12	\N	\N	12	2019-03-11 11:08:59.247+01	2019-03-11 11:08:59.247+01	18	83	Progetto secondo	09:30:00	10:30:00	\N
5	2019-01-01 01:00:00+01	8	\N	89	\N	\N	98	2019-03-11 11:13:09.805+01	2019-03-11 11:13:09.805+01	18	82	terzo	09:30:00	10:30:00	\N
6	2019-01-01 01:00:00+01	8	\N	8	\N	\N	8	2019-03-11 11:14:02.999+01	2019-03-11 11:14:02.999+01	18	82	pappo	09:30:00	10:30:00	\N
7	2019-01-01 01:00:00+01	8	\N	8	\N	\N	8	2019-03-11 11:25:52.929+01	2019-03-11 11:25:52.929+01	18	82	Ollo	09:30:00	10:30:00	\N
8	2019-01-01 01:00:00+01	7	\N	8	\N	\N	9	2019-03-11 11:26:18.312+01	2019-03-11 11:26:18.312+01	18	82	Cinghialino	09:30:00	10:30:00	\N
9	2019-01-01 01:00:00+01	8	\N	8	\N	\N	8	2019-03-11 11:27:30.845+01	2019-03-11 11:27:30.845+01	18	82	Secco	09:30:00	10:30:00	\N
10	2019-01-01 01:00:00+01	6	\N	6	\N	\N	6	2019-03-11 11:28:52.851+01	2019-03-11 11:28:52.851+01	18	82	Lupo	09:30:00	10:30:00	\N
11	2019-01-01 01:00:00+01	1	\N	1	\N	\N	1	2019-03-11 11:29:39.683+01	2019-03-11 11:29:39.683+01	18	82	yhgfshbgfs	09:30:00	10:30:00	\N
12	2019-01-01 01:00:00+01	8	\N	8	\N	\N	8	2019-03-11 11:31:03.801+01	2019-03-11 11:31:03.801+01	18	82	Buono	09:30:00	10:30:00	\N
13	2019-01-01 01:00:00+01	8	\N	8	\N	\N	8	2019-03-11 11:32:00.683+01	2019-03-11 11:32:00.683+01	18	82	bounty	09:30:00	10:30:00	\N
14	2019-01-01 01:00:00+01	56	\N	7876	\N	\N	6	2019-03-11 11:32:30.475+01	2019-03-11 11:32:30.475+01	18	82	bbbbb	09:30:00	10:30:00	\N
15	2019-01-01 01:00:00+01	3	\N	3	\N	\N	3	2019-03-11 11:32:55.929+01	2019-03-11 11:32:55.929+01	18	83	fdwqa	09:30:00	10:30:00	\N
16	2019-01-01 01:00:00+01	7	\N	7	\N	\N	7	2019-03-11 11:33:52.382+01	2019-03-11 11:33:52.382+01	18	82	Ultimate	09:30:00	10:30:00	\N
17	2019-01-01 01:00:00+01	8	\N	8	\N	\N	8	2019-03-11 11:38:33.593+01	2019-03-11 11:38:33.593+01	18	82	ciao	09:30:00	10:30:00	\N
18	2019-01-01 01:00:00+01	4	\N	9	\N	\N	9	2019-03-11 11:39:02.015+01	2019-03-11 11:39:02.015+01	18	82	ygdfsg	09:30:00	10:30:00	\N
19	2019-01-01 01:00:00+01	8	\N	8	\N	\N	8	2019-03-11 11:43:24.62+01	2019-03-11 11:43:24.62+01	18	82	pappo	09:30:00	10:30:00	\N
20	2019-01-01 01:00:00+01	7	\N	7	\N	\N	7	2019-03-11 11:45:09.051+01	2019-03-11 11:45:09.051+01	18	82	jumpio	09:30:00	10:30:00	\N
21	2019-01-01 01:00:00+01	9	\N	9	\N	\N	9	2019-03-11 11:45:39.688+01	2019-03-11 11:45:39.688+01	18	82	Idiota	09:30:00	10:30:00	\N
22	2019-03-11 11:47:02.632+01	8	\N	8	\N	\N	8	2019-03-11 11:47:10.653+01	2019-03-11 11:47:10.653+01	18	82	velo	09:30:00	10:30:00	\N
23	2019-03-11 11:47:41.09+01	9	\N	9	\N	\N	9	2019-03-11 11:47:54.295+01	2019-03-11 11:47:54.295+01	18	82	Io	09:30:00	10:30:00	\N
24	2019-03-11 11:49:02.67+01	8	\N	8	\N	\N	8	2019-03-11 11:49:13.919+01	2019-03-11 11:49:13.919+01	18	82	ultimo	11:49:02	11:49:02	\N
25	2019-03-11 11:54:10.417+01	9	\N	9	\N	\N	9	2019-03-11 11:54:19.194+01	2019-03-11 11:54:19.194+01	18	82	kkk	11:54:10	11:54:10	\N
26	2019-03-11 15:15:21.523+01	9	\N	9	\N	\N	9	2019-03-11 15:15:32.911+01	2019-03-11 15:15:32.911+01	18	82	Fuffa	15:15:21	17:15:00	\N
27	2019-03-11 15:15:48.637+01	8	\N	8	\N	\N	8	2019-03-11 15:15:55.998+01	2019-03-11 15:15:55.998+01	18	82	Pollo	15:15:48	15:15:48	\N
28	2019-03-11 15:15:48.637+01	8	\N	8	\N	\N	8	2019-03-11 15:15:59.184+01	2019-03-11 15:15:59.184+01	18	82	Pollo	15:15:48	15:15:48	\N
\.


--
-- Name: collaborations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: paologio
--

SELECT pg_catalog.setval('public.collaborations_id_seq', 28, true);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: paologio
--

COPY public.customers (id, name, surname, country, email, specialization, city, address, postal, created_at, updated_at, user_id) FROM stdin;
1	Vittorio	Sgarbi	Italy	vitt@emailcom	P	Milan	Via Posticcio, 6	99876	2019-01-01 00:00:00+01	2019-01-01 00:00:00+01	3
2	Gigio	Topo	Italy	tg@email.com	None	Milan	Via Apollonia, 8	90765	2019-03-09 16:29:44.098+01	2019-03-09 16:29:44.098+01	4
3	h	o	i	i@email.com	e	r	d	9	2019-01-01 00:00:00+01	2019-01-01 00:00:00+01	3
7	Gigio	Topo	Italy	tg2@email.com	None	Milan	Via Apollonia, 8	90765	2019-03-09 16:35:45.708+01	2019-03-09 16:35:45.708+01	6
8	Gigio	Topo	Italy	tg42@email.com	None	Milan	Via Apollonia, 8	90765	2019-03-09 16:35:55.4+01	2019-03-09 16:35:55.4+01	6
10	Gigio	Topo	Italy	tg421@email.com	None	Milan	Via Apollonia, 8	90765	2019-03-09 16:36:28.538+01	2019-03-09 16:36:28.538+01	6
12	Gigio	Topo	Italy	tg1@email.com	None	Milan	Via Apollonia, 8	90765	2019-03-09 16:36:52.475+01	2019-03-09 16:36:52.475+01	3
13	Peppo	Hugo	Juro	hugh@email.com	Nulla	I	Buono	98	2019-03-09 16:39:29.802+01	2019-03-09 16:39:29.802+01	3
14	g	g	k	g@email.com	k	k	k	90	2019-03-09 16:41:16.729+01	2019-03-09 16:41:16.729+01	3
15	fdas	fdas	fda	fda@email.com	dfas	fda	fdasfdas	4	2019-03-09 16:42:42.699+01	2019-03-09 16:42:42.699+01	3
16	u	u	k	u@email.com	k	k	k	98	2019-03-09 16:55:19.96+01	2019-03-09 16:55:19.96+01	3
17	f	f	j	f@email.com	k	j	j	9	2019-03-09 17:00:23.703+01	2019-03-09 17:00:23.703+01	13
18	o	o	k	o@email.com	k	k	k	9	2019-03-09 17:11:11.275+01	2019-03-09 17:11:11.275+01	13
19	p	p	o	p@email.com	l	p	l	9	2019-03-09 17:12:38.023+01	2019-03-09 17:12:38.023+01	13
20	a	a	a	a@email.com	a	a	a	88	2019-03-09 17:13:53.009+01	2019-03-09 17:13:53.009+01	13
21	Antonio	Gramsci	Italy	gramy@email.com		Milan	Via Quella, 5	20100	2019-03-09 17:22:26.769+01	2019-03-09 17:22:26.769+01	13
22	Giugno	Apollonio	j	aop@email.com	j	j	j	7	2019-03-09 17:30:44.413+01	2019-03-09 17:30:44.413+01	13
23	Andrea	Galli	k	andy@email.com	k	k	k	9	2019-03-09 17:32:42.032+01	2019-03-09 17:32:42.032+01	13
24	f	f	k	p@emai.com	k	k	kl	9	2019-03-09 17:36:08.963+01	2019-03-09 17:36:08.963+01	13
25	i	i	ik	po@email.com	jk	i	o	8	2019-03-09 17:38:43.153+01	2019-03-09 17:38:43.153+01	13
26	i	i	ik	po1@email.com	jk	i	o	8	2019-03-09 17:39:48.852+01	2019-03-09 17:39:48.852+01	13
27	i	i	ik	po2@email.com	jk	i	o	8	2019-03-09 17:40:51.314+01	2019-03-09 17:40:51.314+01	13
28	i	i	ik	po3@email.com	jk	i	o	8	2019-03-09 17:41:28.132+01	2019-03-09 17:41:28.132+01	13
29	a	p	h	po6@email.com	hjk	gvk	njkl	678	2019-03-09 17:42:55.952+01	2019-03-09 17:42:55.952+01	13
30	a	p	h	po7@email.com	hjk	gvk	njkl	678	2019-03-09 17:45:02.336+01	2019-03-09 17:45:02.336+01	13
31	Gigio	Topo	Italy	tg1456@email.com	None	Milan	Via Apollonia, 8	90765	2019-03-09 17:46:06.412+01	2019-03-09 17:46:06.412+01	3
32	Gigio	Topo	Italy	tgfgd1456@email.com	None	Milan	Via Apollonia, 8	90765	2019-03-09 17:54:13.226+01	2019-03-09 17:54:13.226+01	3
33	Gigio	Topo	Italy	tgfggd1456@email.com	None	Milan	Via Apollonia, 8	90765	2019-03-09 17:55:56.839+01	2019-03-09 17:55:56.839+01	6
34	hjkhjkl	bnklbjkbkj	jfeioubikjbn	fjdklashuyh@email.com	oihniugkg	ohiipugbi	jnkhnuioion	789	2019-03-09 17:56:34.725+01	2019-03-09 17:56:34.725+01	13
35	Velluto	Bello	hjkl	jkfdlsa@email.com	ikgbljhvb	hjko	hiohljb	7897	2019-03-09 17:58:49.436+01	2019-03-09 17:58:49.436+01	13
36	Jullo	Zuppo	fdsa	jf456fkd@email.com	jkl	fd	fdas	7	2019-03-09 18:01:17.852+01	2019-03-09 18:01:17.852+01	13
37	Dio	Bellino	jklfdakl	dio@email.com	jkfrqafre	jklhjg	hufgosdhiljg	78	2019-03-09 18:03:27.99+01	2019-03-09 18:03:27.99+01	13
38	Name	Cogname	fjdiash	uidfo@email.com	fhiduostyfgk	hjklhggu	ghfdiodfs	8979	2019-03-09 18:07:04.731+01	2019-03-09 18:07:04.731+01	13
39	Nunnolo	Surgillo	jkljkl	surgi@email.com	posso	lmial	jhfdlksayul	89	2019-03-09 18:08:32.714+01	2019-03-09 18:08:32.714+01	13
40	polletto	jkl	hujgkl	jfdk@email.com	iubipugkjgbui	bhjkgi	bkjgbioug	89	2019-03-09 18:10:09.469+01	2019-03-09 18:10:09.469+01	13
41	Nonno	Nanni	jfkldsah	nonno@email.com	hfdksayih	jhkldfqayio	hbjfkdsglakg	908	2019-03-09 18:11:46.361+01	2019-03-09 18:11:46.361+01	13
42	Pappo	Hujo	Italy	j11@email.com	ucchieo	Mialn	fjuuuiop	89	2019-03-09 19:12:40.302+01	2019-03-09 19:12:40.302+01	13
43	Oppo	Cirillo	C	j12@email.com	jghjhk	c	hjgiuy	78	2019-03-09 19:17:58.576+01	2019-03-09 19:17:58.576+01	13
44	Cocco	Bello	hul	missing@email.com	jul	hul	ul	8	2019-03-09 19:28:39.717+01	2019-03-09 19:28:39.717+01	13
45	Gino	Parigino	Italia	gi@emai.com	jhug	Milano	cia vaia	89	2019-03-09 19:32:22.56+01	2019-03-09 19:32:22.56+01	10
46	Polletto	Yu	j	y@email.com	j	j	j	8	2019-03-09 19:39:57.903+01	2019-03-09 19:39:57.903+01	10
47	Tonto	Lino	k	lino@email.com	k	k	k	8	2019-03-09 19:43:51.848+01	2019-03-09 19:43:51.848+01	10
48	jupiter	k	k	l@email.com	l	k	l	9	2019-03-09 20:11:12.374+01	2019-03-09 20:11:12.374+01	10
51	Paolo	Pollo	k	poppofp@email.com	u	k	u	8	2019-03-09 20:42:26.501+01	2019-03-09 20:42:26.501+01	10
52	Mauro	Mauri	k	k887@email.com	k	k	k	9	2019-03-09 20:43:43.484+01	2019-03-09 20:43:43.484+01	10
54	Reppo	Kullo	k	kulo@email.com	l	k	l	9	2019-03-09 21:48:13.697+01	2019-03-09 21:48:13.697+01	12
55	Aldo	Baglio	k	aldo@email.com	l	k	l	9	2019-03-09 21:49:21.349+01	2019-03-09 21:49:21.349+01	12
56	Nello	Splendo	k	kjln@email.com	i	k	i	8	2019-03-09 21:50:06.655+01	2019-03-09 21:50:06.655+01	12
57	Giovanni	Storti	k	illo@emailc.com	i	k	i	87	2019-03-09 21:52:30.19+01	2019-03-09 21:52:30.19+01	12
58	Giacomo	Poretti	j	jmmn@email.com	k	j	k	9	2019-03-09 22:00:24.991+01	2019-03-09 22:00:24.991+01	12
59	Pino	Paleso	k	ollo@email.com	l	k	l	9	2019-03-09 22:11:16.323+01	2019-03-09 22:11:16.323+01	12
60	Lurido	Fuffo	k	hnbhg@email.com	k	k	k	9	2019-03-09 22:12:31.935+01	2019-03-09 22:12:31.935+01	12
61	alesso	kfudsak	k	hgbbv@emailc.com	k	k	k	9	2019-03-09 22:13:50.792+01	2019-03-09 22:13:50.792+01	12
62	Prova	Provona	k	ujj@email.com	k	k	k	9	2019-03-09 22:17:21.386+01	2019-03-09 22:17:21.386+01	12
63	bullo	astro	k	illommn9@email.com	k	k	k	9	2019-03-09 22:18:42.335+01	2019-03-09 22:18:42.335+01	12
64	Renato	Girato	k	hn554@email.com	k	k	k	9	2019-03-09 22:23:38.837+01	2019-03-09 22:23:38.837+01	12
65	Puello	Rocco	k	hy743892@em.com	k	k	k	9	2019-03-09 22:24:51.288+01	2019-03-09 22:24:51.288+01	12
66	Radio	Gaga	jkl	k@k.it	nkl	bjk	nkl	87	2019-03-09 22:27:04.138+01	2019-03-09 22:27:04.138+01	12
67	Pelato	Patato	k	k@o.it	k	k	k	9	2019-03-09 22:28:26.663+01	2019-03-09 22:28:26.663+01	12
68	Peppo	Pelato	k	l@l.it	k	k	k	9	2019-03-09 22:30:40.575+01	2019-03-09 22:30:40.575+01	12
69	Dirk	Gently	k	l@lll.kkk	k	k	k	8	2019-03-09 22:32:45.22+01	2019-03-09 22:32:45.22+01	12
70	Mark	Rosenberg	j	i@o.oll	k	j	k	9	2019-03-09 22:33:26.999+01	2019-03-09 22:33:26.999+01	12
71	Fortunato	Gino	k	luna@luna.luna	k	k	k	9	2019-03-09 22:37:26.537+01	2019-03-09 22:37:26.537+01	16
72	Dottoressa	Gio	d	v@email.com	d	d	d	4	2019-03-10 08:21:36.773+01	2019-03-10 08:21:36.773+01	17
73	Coglione	Bastardo	k	oppolino@email.com	k	k	k	9	2019-03-10 08:25:29.137+01	2019-03-10 08:25:29.137+01	17
74	c	c	d	c@libero.it	d	d	d	4	2019-03-10 08:28:11.446+01	2019-03-10 08:28:11.446+01	17
75	Non	Funzia	italy	fun@email.com	incendio	milano	cia addresses	98	2019-03-10 09:17:47.199+01	2019-03-10 09:17:47.199+01	17
76	Vinicio	Matte	ifdjkl	kekko@email.com	lkjkjjj	jfkdlasjk	jkl	9	2019-03-10 09:20:49.719+01	2019-03-10 09:20:49.719+01	17
77	Buondi	Cullo	bounty	cullo@email.com	l	h	k	99	2019-03-10 09:22:59.356+01	2019-03-10 09:22:59.356+01	17
78	Paossio	Channel	k	channel@email.com	k	k	k	9	2019-03-10 09:24:13.795+01	2019-03-10 09:24:13.795+01	17
80	Kekko	zalone	k	zalon@email.com	k	k	k	90	2019-03-10 09:25:38.631+01	2019-03-10 09:25:38.631+01	17
81	Franco	Bidone	k	bidone@email.com	k	k	k	9	2019-03-10 09:27:36.424+01	2019-03-10 09:27:36.424+01	17
82	Dio	Bellino	heaven	dio@bellino.com	h	paradise	h	666	2019-03-10 09:29:40.791+01	2019-03-10 09:29:40.791+01	18
83	Fuffolo	Baffolo	h	fuffolobaffolo@email.com	nessuna per ora	h	via degli svergognati	9	2019-03-10 09:30:37.101+01	2019-03-10 09:30:37.101+01	18
84	Faggiolata	Farinacci	k	farina@email.com	k	k	k	99	2019-03-11 15:17:21.734+01	2019-03-11 15:17:21.734+01	18
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: paologio
--

SELECT pg_catalog.setval('public.customers_id_seq', 84, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: paologio
--

COPY public.users (id, name, surname, username, email, birthdate, country, password, city, address, postal, created_at, updated_at) FROM stdin;
0	Paolo	Galli	paologio	paolo@email.com	2019-02-17	Italy	peppussso99	Milan	Via pepu, 39	20100	2019-02-17 21:14:33.042+01	2019-02-17 21:14:33.042+01
3	Claudio	Lippi	Claudione	ci3@email.com	2000-12-31	Italy	$2b$12$zpxQosCo42VXrdiJtAY6Z.Z/OuGiNPQVC6EXj5AouvQZ5ZHTGIMpa	Milan	Via Dei Rognosi 34/B	20100	2019-03-04 11:13:44.638+01	2019-03-04 11:13:44.638+01
4	Gio	Bello	GioBello	bello@email.com	2019-01-01	Italy	$2b$12$SJ.RCMGbxRi61R2EtcosJuUqp5hW7FWjVTLyzYE6lsV6jZ8BghEwO	Florence	Via Sigismondo, 8	40521	2019-03-04 15:34:03.765+01	2019-03-04 15:34:03.765+01
6	Gio	Bello	GioBeo	be@email.com	2019-01-01	Italy	$2b$12$L2nlYUrSe1S0uvKfULFBduZy9bPkdJtwUZSFHNtqn87V0iZhKe702	Florence	Via Sigismondo, 8	40521	2019-03-04 15:47:04.466+01	2019-03-04 15:47:04.466+01
10	Gio	Bello	GioBeoBeo	beobeo@email.com	2019-01-01	Italy	$2b$12$.dYJDaa/d1ewYsHo42F6UOUgnal0kYcyY2BkUfJVaVNt5nRjNsrXK	Florence	Via Sigismondo, 8	40521	2019-03-04 15:58:11.555+01	2019-03-04 15:58:11.555+01
11	Gio	Bello	GioBeoDeBeo	bebo@email.com	2019-01-01	Italy	$2b$12$UzCG6efT6vDW.jbl4lR15eDxEFFY735P77oHhfuecVUXOQ8EI3UE.	Florence	Via Sigismondo, 8	40521	2019-03-04 16:06:26.237+01	2019-03-04 16:06:26.237+01
12	Gio	Bello	GioBeoBeo2	beobeo2@email.com	2019-01-01	Italy	$2b$12$hCSgY5Z.t1FxSMouqyjBnOjGeW.MgyId5hrC4m67w23ipH1aS4wGS	Florence	Via Sigismondo, 8	40521	2019-03-04 16:13:01.569+01	2019-03-04 16:13:01.569+01
13	Johnny	Bravo	tooCool	cool@email.com	1980-01-01	Italy	$2b$12$GB5eB0lC/WaSjdvSGKzBKeVIMAqo4lolnZtJWNRw7guIcf3G5GTF2	Florence	Via Bellino, 55	14520	2019-03-04 16:14:54.06+01	2019-03-04 16:14:54.06+01
15	Claudio	Lippi	Claudione456	ci456@email.com	2000-12-31	Italy	$2b$12$3twUTYhcWmfyBmvvYsEzeebni8kxDTqa3sHiyBKyY7CAwuQKRo7By	Milan	Via Dei Rognosi	20100	2019-03-09 17:47:26.743+01	2019-03-09 17:47:26.743+01
16	Claudio	Lippi	Clauditone456	cit456@email.com	2000-12-31	Italy	$2b$12$IAlKlOGc.7sMV3ggCX31SefrQ4B7FUsmzsuVTyTGAbNagcYCrNlDO	Milan	Via Dei Rognosi	20100	2019-03-09 17:48:23.295+01	2019-03-09 17:48:23.295+01
17	Andrea	Bozzo	bozzolone	andrea@bozzolo.com	1994-07-26	Libertalia	$2b$12$uP4CrXtVnwlgKy2HzRezU.RHLGngcD8H1zacCYSuyp9TLI8S1MZpq	LibertyCity	Via dello Scopettino d'oro, 22	112233	2019-03-10 08:14:41.168+01	2019-03-10 08:14:41.168+01
18	Paolo	Galli	admin	p.galli@email.com	1991-12-03	Italy	$2b$12$yiZHGrgapwQ64rRaLfZxkOGcdK6L9yGZZZ6hJH6FCoMXHSVzN8rPO	Milan	Via Natale Battaglia, 33	20127	2019-03-10 09:28:46.765+01	2019-03-10 09:28:46.765+01
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: paologio
--

SELECT pg_catalog.setval('public.users_id_seq', 18, true);


--
-- Name: collaborations collaborations_pkey; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_pkey PRIMARY KEY (id);


--
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: collaborations collaborations_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: collaborations collaborations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: customers customers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

