import express, { Router } from 'express'
import serverless from 'serverless-http'
import ejs from 'ejs'
const server = express()
const router = Router()
server.set('view engine', 'ejs')

server.use('/build', express.static('views/build'));

router.get('/', (req, res) => res.render('index'))

router.get("/dashboard", async (req, res) => {
    try {
        const data = await Statistics.findOne({});
        const html = await ejs.renderFile('views/dashboard.ejs', { data });
        res.send(html);
    } catch (err) {
        console.error('Error fetching statistics:', err);
        res.render('500')
    }
});

router.get("/api/data", async (req, res) => {
    try {
        const statistics = await Statistics.findOne({});
        res.json({
            guilds: statistics.guilds,
            users: statistics.users,
            channels: statistics.channels,
            ping: statistics.ping,
            bans: statistics.bans,
            profiles: statistics.profiles,
            lastUpdate: statistics.lastUpdate,
            events: statistics.events,
        });
    } catch (err) {
        console.error('Error fetching statistics for API:', err);
        res.render('500')
    }
});

router.get("/invite", (req, res) => res.redirect('https://discord.com/oauth2/authorize?client_id=971024098098569327&permissions=1498209971415&scope=bot%20applications.commands'));
router.get("/support", (req, res) => res.redirect('https://discord.com/invite/Gj8xWwg38U'))

router.get('/guild', (req, res) => res.render('guild'))
router.get('/privacy', (req, res) => res.render('privacy'))
router.get('/terms', (req, res) => res.render('terms'))
router.get('/blank', (req, res) => res.render('blank'))
router.get('/billing', (req, res) => res.render('billing'))
router.get('/premium', (req, res) => res.render('billing'))

router.get('/404', (req, res) => res.render('404'))
router.get('/500', (req, res) => res.render('500'))
router.get('*', (req, res) => res.render('404'))

server.use('/', router)
export const handler = serverless(server)