import { useState, useEffect, useRef } from "react";

// ── Config ────────────────────────────────
const SB_URL = "https://upgevmtgtmnwprdyjmsw.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZ2V2bXRndG1ud3ByZHlqbXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NjQ0NjIsImV4cCI6MjA5NTU0MDQ2Mn0.ncL7ioYqzDGSyVFrlrYiCWTNN_yZxiESROFS-uBVEtM";
const LOGO_DATA_URL = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAEbA+gDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIBQYBBAkDAv/EAFgQAAEDAgIEBwkJDAkCBwEBAAABAgMEBQYRBwgSIRMxQVFhcYEUIjI2N5GhsbMVQlZydHWTstEXGCNSVWJzgpKUwdIWMzQ1U1SDosNDwiQlY5XT4fAm8f/EABsBAQACAwEBAAAAAAAAAAAAAAABBgIFBwQD/8QAOBEBAAEDAgMFBQcEAgMBAAAAAAECAwQFEQYhMRJBcbHBEzRRYYEUM3KRoeHwFiKi0RVCMjVS8f/aAAwDAQACEQMRAD8AuWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAZjMABmMwAGYzAAxldf7NQ3BtBWXGCnqXNRyMkXLcvFv4uTnMjFJHLGkkUjZGLxOauaL2mFN2iqZppmJmGdVquiIqqiYiej9AZgzYAAAAAAAAAAA1nFmPsG4VuEdBiLEVDbKqWJJmRTvVHOYqqiO4uLNqp2GH+7Jou+G9o+kX7Cu2vH5UbT8yR+3mIDCdnoph/SXgK/wB2htNmxTbq6unz4KCJ6q52SKq5buZFU24oZqr+XXD/APr+xeXzCAAADAYtxnhbCS06YkvlHa1qdrgeHdlt7OWeXVmnnM+Vc17/AOswl1VX/GBM33ZNF3w3tH0i/Yduz6UtHl4ulPa7Zi22VVbUvSOGGORVc9y8ibjzvN50AeWnCfziz1KE7PQkABAAAABHWmHS9hnRxS8DVvWvvEjNqG3wOTby5HPX3jeld68iKBInJmaliXSZgHDj3RXjFlrp5W8cTZuEkT9VmalLtI+mTHWN5ZI626PoLc5e9oaJyxx5czlTvn9q9hHmSBOy8dVrH6LIHq1l0r6jLlioX5L50Q5o9Y3RXUPRr7tW02fLNQyZJ5kUo2AbPRnDOkPA+JXJHZMU2urldxRJOjZF/Udk70G0nl6m5Ucm5U4l5iTtG2nDHWC5YoEuDrxbGqiOoq56vRG8zH+E30p0A2X0Bo2ifSjhnSNblltE609fE1FqaCdUSWLpT8Zv5yduRvIQAAAAEA0aq0u6NKaplpqjGdqjmhe6ORjpFza5FyVF3ciofP7smi74b2j6RfsKIYz8cb3841HtXGJCdnpVhTE+H8VUMtdh27U1zpopOCfJA7NGvyRcuvJUMwQBqO+Ta8fOzvZRk/hAAABhcWYrw5hOlgqcR3iltkM71jifO7JHuRM8k7DNFdNerxMw585P9koEnfdk0XfDe0fSL9h97fpZ0b3Cvp6Gixja56mokbFDEyRc3vcuSIm7jVVPPM2XRX5TcL/O9L7VoTs9HQFAQHzqJoqenkqJ3pHFExXvevE1qJmq+Y+hi8WeKt3+QzezcBq33ZNF3w3tH0i/YPuyaLvhvaPpF+w8+W+CnUchOz0F+7Jou+G9o+kX7DlumPReq5Jjez9sqp/A8+QDZ6NWzSHgS5PRlFjCxzOdxNStYir2KpssMkc0aSQyMkY7ejmORUXtQ8v1RF40Qz2FcYYpwtUNnw/fq+3qi57EUq8G7rYver2oDZ6SgrVoe1loq+qgs2kCKGklkVGR3SFuzEq8nCt978ZN3QhZNj2yMa9jmvY5EVrmrmiovKgQ/QAAAAAAa5j/ABrhzA1kddsRV7aeLiiib30szvxWN41X0Jy5AbGYnEGJMP4fi4W+Xu321uWad01DWKvUirmpUHSZrH4vxFLLSYbVcO21c0R0So6pkTnV/vepvnUhatqamtqX1NbUTVM71zdLM9XucvSq7wnZeu56f9FVC9Wf0l7qcn+WpZHp59nIxiayui7ay7sumXP3C7IpEAbL52rT3oquD0YmKGUrl4kqqeSNPOrcvSb9Y77ZL5Bw9mu9DcY8s9qmnbJl15LuPM47Ftrq22VbKu3VlRR1DFzbLBIsb07U3g2enQKb6L9ZXE9kmiosYMW/W7c1Z0RG1Uac+fE/qXf0lr8HYosWL7HFecP3COtpJN2bdzmO5WubxtcnMoQzIAAGu4sxxhLCdRBT4jv9FbJahiviZO/JXtRclVO02IqVr1+NeGfkM3tEAnj7smi74b2j6RfsO/YNJmAb9doLTZsVW6trp1VIoInqrn5Iqrlu5kVTzrJN1W/Lthz40/sJAnZfUABAAAAAAAAAAANcxZjrCGFKqGlxHiChtk87FkijnfkrmouWadGZhfuyaLvhvaPpF+wp7rFYq/pbpavFbFJt0lI/uKlyXdsR5oqp1u2l7SPAnZ6HWvSto5udxp7dQYwtdRV1MiRQxMkXN713IibuNTdDzCo6mejrIKymesc8EjZYnpxtc1c0XzoekGAMQQYrwXaMQ06ps11KyVyJ71+WT29jkVOwIZ0AAAAAAAA4Xcma8RiMZYls+EcO1V+vtUlNRUzc3Lxue7kY1OVyruRClOl7TfivHdTNSUtRLZ7EqqkdHA/J0jeeV6b3L0cXrAtvijSzo6w3M+C6YroEqGeFDA5ZnovMqMRcl6zU5NZTRa1+yldc3p+M2hfl6SkCIiAJ2X0s+nrRXc3pG3E8dI9eJKuCSJPOqZekkK03S23ekbV2q4UtdTu4paeZsjfOinmSZPDWIL5hq4Nr7Bdau21LV8OCRW59CpxOToXMGz0vBXTQdrFxXyrp8PY5bDSV8rkjp7hG3Zimcu5Gvb7xy86bl6CxYQAAAAQxrA6b6PAKOsVjZDXYikZm5H74qRFTc5+XG7lRvavSEs3q72qy0Tq28XKkt9M3jlqJmxt86qRzdtYLRVb5VjTELqxycfctLI9PPkiKUoxXia/Yqub7liG61NxqXLudK/NrE5mt4mp0IhiAnZeGn1kdFsr0a643GFPxpKF+XozNvwzpR0fYjkbFaMWW2WZ3FFJJwUi9Gy/JVPO8KiLxg2eoKb0zTiOSgejLTNjbA08UVNcH3K1tXv6Cser2ZfmO42L1buhS5WijSNYNI1idcbM98U8OTaujl/rKdy8SLzouS5OTjy7AhuQAAAAAAYfGdx9ysMV9Yi5PbErY/jO3J6VPnduRaomurpEbvpat1Xa6aKeszt+aFca3H3VxRX1aLmxZVZH8Vu5PVn2nSttzuNtft0FdUUy/+m9UReziU6gOU1366rs3d9pmd3WqLFFNqLW28RGyRcGY9vtXeKO2VccFW2eVrFk2dl7U5V3blyTNeIlYh/Qvbu6MQT3B7c2UkWTV/Pdu9SKTAX7h+u/cxe3eqmd55b/D/wDXPuIbdi1ldizTEbRz2+M/sAA3jRAAAAAAAAKca8flRtPzJH7eYgMnzXj8qNp+ZI/bzEBhMJP1V/Lrh/8A1/YvL5lDNVfy64f/ANf2Ly+YJAAEBVzXv/rMJdVV/wAZaMq5r3/1mEuqq/4wKwG86APLThP5xZ6lNGN50AeWnCfziz1KEvQkABAAdDEN2orDYq69XGTg6SigfPK781qZ7unkAjfWJ0sQaObA2kt6xzYhr2L3LE7ekLeJZXpzJyJyr0IpR26V9bdLjPcblVS1dZUPWSaaV2057l5VUyukHFNwxpi+4YjuTl4arkzYzPNIo03MYnQiZJ5zAhIZbDOGsQYmrO48P2atucyeElPErkb8ZeJvapIOr1ojqdI94fW3B0tLh2ieiVMrNzp38fBMXny415EXnUuzhuw2fDdpitVit1PQUcSZNihZknWq8ar0rvBupjbdW3ShVxJJNRW2izTPZnrW7X+1FPxdtXHSjQwulhttBXo1M1bTVjdrsR2zmXjARu8zsQWK9Yer1ob5aqy21Kf9OoiVir0pnxp0oY49KMY4WsOLrNJacQ22GupXouSPTvo1/GY7javShRzTrovr9GuJGwbb6qz1iq6hqlTeqJxxv/PT0pv6id2k4evN0w/eaa8Waslo66mftxSxrkqdC86LxKi7lL36CdJtFpJwr3UqR094pMo6+lRfBdyPb+Y7k5t6chQE3DQ9jaqwDjyhv0LnrSo7gq6JP+rA5e+TrTwk6UQD0SB8aOpgrKSGrppGywTxtkje1dzmuTNFTsU+wQBAEA808Z+ON7+caj2rjEmWxn443v5xqPauMSErh6jvk2vHzs72UZP5AGo75Nrx87O9lGT+ESAAAV016vEzDnzk/wBkpYsrpr1eJmHPnJ/slAqQbLor8puF/nel9q01o2XRX5TcL/O9L7VoZPR1QFAYhi8WeKt3+QzezcZQxeLPFW7/ACGb2bgPNBvgp1HJw3wU6jkMkvaN9AWJsdYRpcS2282impqlz2tjqFk202XK1c8mqnGhsMmqrjdrFVl/w+93Im1Kmf8AsJs1S/IXZf0lR7Z5K4QoRjTQbpHwrSyVtTZkr6ONFV81BJw2ynOrdzkTpyI0PUIpzri4AocN4kosUWemZT0l3V7amKNMmtqG79pE5NpFz60XnBugMtpqZ6Q6i626pwLdqh0s9BFw1ve92blgzydH07KqmXQvQVLN/wBXa6yWjTThmoY/ZbNVpSydLZUVmXnVPMCXoGAAgAOHKjWq5yoiImaqq7kA1LSxjy06PMJTXy5LwkqrwdJTI7J1RKqbmpzJyqvIhQrHuL75jbEU18v9W6eokXKONFyjgZyMYnIienjU2jWHx/Nj7SDUzwzKtot7nU1vZnuVqL30nW5Uz6sk5COAkPpTwzVM7KenhkmmkXZZHG1XOcvMiJvUz+jnBt5x3imnsFkiRZZO+llf4EEacb3LzJ6VyQvJop0V4W0eW9jLZSNqbk5uU9xnaizSLy5fiN/NTtzAqJhzQPpQvcLZ48OOoYnJmjq6ZsK5fFVdr0GwO1Y9JSM2kdZFX8Xuxf5S6wCN1BsRaDNKFkidNNhiWriamavopWz7vitXa9BHVTBNTTvp6mGSCZi5PjkYrXNXmVF3oenxp+kXRthDHtGsV/tcbqhEyjrIURlRH1PTjToXNOgJ3edpafUmwfdaaC4Yzqqmpp6Cqb3NS0yOVGVCovfSuTlyVNlF+MdKLVPq0xC1JcWQPsqSZuVKdUqVZn4OXgovJnn2FnbNbaKz2mltVup2U9HSRNhhjam5rWpkiAdsABAVK16/GvDPyGb2iFtSpWvX414Z+Qze0QEK5Em6rfl2w58af2EhGRJuq35dsOfGn9hIEr6gAIAAAAAAAADTNNmKUwdoxvd7a9G1DadYaXfvWZ/esy6lXPsNzKsa8WKtursuDaeTvY2rX1bUX3y5tjRezbXtQCsiqqqquVVVd6qvKoBMOijR87EWhHHt+4DbqIWxpQrlvzh/CyZdaKiBKHi2upBinuvDV1wjUSZy2+buqmRV/wClJ4SJ1PTP9YqUm9CQNXnFP9EdLNmr5ZNikqZO46rNd3Bybs16nbK9gHoEAAgAAAA6OIK33NsFxuP+VpZZ/wBliu/gBTHWxx9NinH8tgpJ19yLI9YWNaveyz8Uj158l71Opechk/dRPJVVEtVM5XSzPWR7l41c5c1XzqfNy5Iq8wS2nR7gHFOPLg+jw3bXVCRZcNO9diGHPi2nLy9CZr0Eu0+qlix8COnxPZYpVTexscr0TtyT1FitCuGKLCejOy2ukia176VlRUvRN8kz2o5zl5965dSIbmDdRTG+r/pFwxA+qjt8N6pGJm6S3PV7mpzrGqI7zIpFL2uY9zHtc17Vyc1yZKi8yoeoJHukXQ5gTHVWlddra+nr8++q6J/BSSdDtyo7rVM+kG6t+qFgH+kuN3YmuEO1bLI5HsRyd7LUr4CdOynfL07JdIweB8KWPBmHobFh+k7mo4lV292057l43OcvGqmcCAAAajpfxjFgTR9c8RORr54WcHSxu4nzO3MTqz3r0Ip553Ouq7ncai43CofUVdTI6WaV65ue9VzVVLR69d1kjtOGbIxypHPPNUyJz7DWtb9dSqgTAS/gXV30gYnoIrhPHSWSllajo1rnOSRzV4l2Goqp25Hx1UcMUeJdLtKtwhZNTWynfXLG9M2ue1WtZmnKiOci9hekCn9w1VMYw07pKLEVlqpETdG5skefUuSoRDjjAmLMFVSQYkstTRNcuTJstuGT4r0zavVxno8dW62+gutBLb7nRwVlJM3ZkhmYj2OTpRQbvMhrXOcjWNVzlXJERM1VeYv1q8YDbgLR1S0lREjbrXZVVe7Lej3JuZ1NTJOvPnOlY9AOjez4qixDSW2qdLBKk0FNLUK+njei5oqNVM1yXeiKqoSoAAAQAAARxptuOxR0NqY7fK9ZpE6G7k9Kr5iRyCNJNx90sYVj2uzjgVIGdTeP05mh4iyPZYc0x1qnb1lv+HMb22ZFU9KY39Ia4AfahppK2tgo4kzknkbG3rVcjn0RNU7Q6HMxTG8pl0SW7uLCUc7m5SVj1mX4vE30Jn2m4HwoqeOkpIaWJMo4WNY1OhEyPudXxLEY9ii1HdDk2XfnIv13Z75AAeh5gAAAAAAAFONePyo2n5kj9vMQGT5rx+VG0/Mkft5iAwmEn6q/l1w//r+xeXzPP/V0u9ssWmGy3S8V0NDRQ8Nwk8zsmtziciZr1qiFyPuu6MvhtZvpwS3gGj/dd0ZfDazfTj7rujL4bWb6cIbwVc17/wCswl1VX/GTX913Rl8NrN9OV41xsXYZxU/DS4dvdHc+5kqOG7nftbG1sZZ9eS+YCvhvOgDy04T+cWepTRjedAHlpwn84s9ShL0JAAQEBa6+Jn2zAFDhynkVst4qc5sl38DFk5U7XKzzE+lM9dm5uqtKdFbtrvKG2M3cznuc5fQjQIJOxbaKouNxprfSMWSoqpmQxNTlc5URE86nXJO1W7Sy76brG2Vu1HSLJWKnSxi7P+5WhK6mjvC9Fg3Bltw5QtbsUkKNkeib5JF3vevSrs1NgACAAADTNNGDYMdaO7nY3xtWq4NZqJ6pvZOxM2KnX4K9CqbmAPL57HxvdHI1Wvaqtc1eNFTjQ4N006Wllk0vYnt8TNiJK98sbeZsmUifWNLCV4dUbEzr/ojp6Kok26mzzOonZrmqxpk6Nf2Vy/VJhKn6ilyey/4ls6u7yWliqUTpY5Wr9dC2AQBAEA808Z+ON7+caj2rjEmWxn443v5xqPauMSErh6jvk2vHzs72UZP5AGo75Nrx87O9lGT+ESAAAV016vEzDnzk/wBkpYsrpr1eJmHPnJ/slAqQbLor8puF/nel9q01o2XRX5TcL/O9L7VoZPR1QFAYhi8WeKt3+QzezcZQxeLPFW7/ACGb2bgPNBvgp1HJw3wU6jkMl69UvyF2X9JUe2eSuRRql+Quy/pKj2zyVwxCvuvJLE3R3ZYXZcK+6o5nPkkT8/WhYCR7I43SSPaxjEVznOXJERONVUpFrVaRaPHGMoLfZp0ntFna6OOVvgzyuVNt6c7dyIi8uSrygQ4bboZp5KvS1hSCNO+W6wO7Eeir6EU1InLU0wpLeNJMmIpYlWjssKuRypuWeRFa1OtG7S+YJXQAAQEbay2J34W0P3ipp5Fjq61qUNO5FyVHSblVOpu0vYSSVm17Lm5lswxZmu3SzTVL28+y1rW/XUCqwXcgMvgm1e7uMbNZclVK6uhgcnQ56IvozDJc/VYwLFhHRvTXGogRt1vTW1VQ5U75kap+Dj6kaufW5SXD8RRshiZFE1GsY1GtanEiJuRD9hiAAAAAAAAAAAVK16/GvDPyGb2iFtSpWvX414Z+Qze0QEK5Em6rfl2w58af2EhGRJuq35dsOfGn9hIEr6gAIAAAAAAAAfmWRkUT5ZHIxjGq5zlXciJxqec+lbE0mMNId6xC5yrHU1LkgRfewt71ifsohcrWexUuFtEVzdDJsVlyyoKfJd/4RF217GI70FDU3JkEwKehOg/CseF9E1lsk8LeFkpeGq2qnhSS989F6s9nsKT6FcNLi3SjYbK5m3A+pSaoT/0o+/f50TLtPRBEREyRMkBLzj0pYcdhLSHfMPq1Wx0lW5Ic+WJ3fMX9lUNazVN6KqKnEqchYvXhw13Jiiz4qhjyjr4FpZ1T/Ej3tVetrsv1SugHoboPxSmMdF9lvT3o+pWBIKrfvSaPvXZ9eWfabqVV1HcVcFX3rBtRL3szUrqRqr75MmyInWmwvYpaoIAAAMRjSnfV4OvdJGmb5rfPG1OdVjciGXOFRFRUVEVF3KigeXrUVERF3KnGcqmaKhuemrCM+CtJF2sskatp1mWejcqbnwPVVbl1b2r0oppgZL5au+ke042wTQ0SVMcd7t9OyCspXOyeuyiNSRqcrVRM804l3KSgeYturay21sVdb6uekqoXbUc0L1Y9i9CpvJrwNrNY1szI6bEFNS4gpm5Jtv8AwM+Xx2pkva3tCNlzwRHgfWF0d4kdHT1VdLYqx+ScFcG7LFXokTNvnyJYgmiqIWTwSsliem0x7HI5rk50VOMIfQAAAABVvXvpX8NhOty7zZqYlXp/Br9pWEvRrWYQmxXoqqZaKJZa60SJXRNamauY1FSRqfqqq/qlFwmEiavOOaXAOkmmu1xR3ubUROpKtzUzVjHKio/Llyc1FXozL622uo7nQQ19vqoauknYj4pono5j2ryoqHmMbXgHSJjHA021hy8zU8LnbT6V/wCEgevSxd2fSmSg2ei4KxYL1q4H7EGMMOviXcjqq3O2k61jcufmcpOmB9IWDsaRI7Dt9pauXLN1Oq7EzetjsnejIIbSAAAAAAADo36ubbLLWV713QQucnSuW5PPkV0e5z3ue9c3OVXOXnVeMl3TRce57BBb2OyfVy5uT8xu/wBeREJROJsj2mTFqOlMfrP7bL7wvjezxqrs9ap/SP33DcNEdu7txYyoc3OOjjWVfjLub61XsNPJg0M27ubDs1e9uT6uVdlfzG7k9OZ4NDx/b5tET0jn+X77PfruT7DCrmOs8vz/AG3b0hycIcnSnMwAAAAAAAAAAU414/KjafmSP28xAZPmvH5UbT8yR+3mIDCYAbVomwnHjjH1uwxLWvoWVnCZztjR6t2WOdxKqZ8WRYD70yg+G1V+4N/mAqqC1X3plB8Nqr9wb/MPvTKD4bVX7g3+YG6qoLVfemUHw2qv3Bv8xFOn7RPT6L3WdIL3Lc/dHhc9uBI9jY2eZVzz2vQDdFZvOgDy04T+cWepTRjedAHlpwn84s9SgehIACAotrbuc7Tpd0d72CmROrgm/aXpKR65NG6m00TVCpk2rt8ErenJFYv1QmEMk4albGu0vzuXjbaplT9uNCDyYdT6ubSabKOF7skq6OeFOvZ20+qCV4QAEAAAAACietmxrNOl52ffRU7l6+CaRSSPrMV7bhpwxLIxc2wzMp+1kbWr6UUjgJTrqSvc3SxXNTidaZM/pIy5pUDUao1lx/fK7JdmntiR59L5G5ehqlvwiQIAgHmnjPxxvfzjUe1cYky2M/HG9/ONR7VxiQlcPUd8m14+dneyjJ/IA1HfJtePnZ3soyfwiQAACumvV4mYc+cn+yUsWV016vE3Dnzk/wBkoFSDZdFflNwv870vtWmtGy6K/Kbhf53pfatDJ6OqAoDEMXizxVu/yGb2bjKGLxZ4q3f5DN7NwHmg3wU6jk4b4KdRyGSWdHenrFmB8J0uG7XbLPPS0znuY+ojkV67TlcueTkTjXmM/LrTY/cxUZacPxr+MkMi5ed5A4RUXiUIb3jzS5j7GlO6kvN8eyid4VJStSGJ3Q5E3u7VU0QG2aKrPhK+4sgt2Mb9UWailVGsliiRUe5V8Fz1X8Gi/jZKnUBj8D4TvmM8QwWOwUbqiplXvnZZMhZyvevI1P8A/N5frRTge26P8G0uH7f+Ee38JVVCpk6eZfCevqROREQ7eA8G4awXZ227DVthpIHZOfInfSTL+M9673L/APkNhCAAACpWvW5y4sw0z3qUEqp18In2FtSrGvdQuSswrckTvHR1ECr0orHJ61ArIb3q+Ma/TXhNruJLg1e1GuVPUaIbXodr2WvStheulXKOO6Qo9eZHORq+sJei4ACAwGkDFNFgvCNdiW4wVE9LRo1ZI4ERXrtORqZZqica85nyMdaTyFYj+JD7ZgGn/fVYH/IWIfo4v/kH31WB/wAhYh+ji/8AkKdgJ2XE++qwP+QsQ/Rxf/IbRow06YZ0gYqbh21Wu7U1S6B8yPqWRozJuWad65Vz38xRMmbU28tUXzdUf9oNl3AAEBUrXr8a8M/IZvaIW1Kla9fjXhn5DN7RAQrkSbqt+XbDnxp/YSEZEm6rfl2w58af2EgSvqAAgAAAAAADqXm4U1ptFZdKx6MpqOB88ruZrWqq+oCouurir3Tx5RYYp5M6ezwbcyIu7h5clXzNRvnUgIyeK71U4jxNcr9WKqz19S+d3RtLmidiZJ2GMXcmYSsxqNYa4S4X3Fs0fewsbQ0zlT3zsnyKnYjE7S1RHurthpcLaIbHQyR7FTURd2VKcu3L32S9TdlOwkIIRhrQYa/pLoduzYo9uqtyJXwZJv8Awfhf7FcUMPT6pgiqaaWmnYj4pWKx7V4laqZKnmPN3H1glwvjW8YfmRUWhq3xMVffMzzYva1UUJh2tFmJpMH6QbLiFjlSOlqW8OiL4UTu9kT9lVPRmGSOaJk0T0fG9qOY5OJUXeinmAXw1XcVLijRFbeGl26y2Z0FRmu/vMthe1it8yglKQACAAARxp10WW7SXh9kXCMo7zRoq0NWrc0TPjjfyqxfQu9OmkONcIYiwbdn2zEdrnopkVUY9yZxypzsem5ydR6SnRvlntV8t77feLdS3Ckf4UVREj2+ZeXpA8ywXKxpqw4LuqyT4eraywzuzVI0Xh4M/iuXaTscQrjXV10iYejkqKKlp79Ss37VC9eEy/RuyVezMJ3Q+bro10n4vwDWMfZbk+Si2s5aCocr4JE5e996vS3JTTaiGannfBURSQzRu2XxyNVrmrzKi70U/AHoZoh0j2TSRh33RtqrBVw5NrKJ7s3wPX1tXkdy9Zux556EcaVGBdIttu7JXNo5JEp69iLufA5UR2fVucnSh6Ftcjmo5qorVTNFTlQIcgADhURUVFRFReNFKlawegG4UFwqcTYGon1lvmcstTbokzkp3LvVY098zlyTenSnFbYAeX0jHxyOjkY5j2rk5rkyVF5lTkOD0Nx7oswNjbakvtjhdVqn9sp/wU6frN4+3Mg7GOqnO1XzYSxKyRvG2muMeS9XCM/i0J3VjPpTTzU1QyopppIJo12mSRuVrmrzoqb0Nox3o5xngh//APRWOengVcm1Uf4SB367dydS5KamErFaD9Yu5W2rp7Hj6odXW56oyO5OTOaDm4T8dvTxp0ltYJYp4Y54ZGSRSNR7HsXNrmqmaKi8qHmAXB1L8az3nCdbhOvmWSezK19K5y5qtO/PJv6rkVOpUTkCFgQAEAB8K+pjo6GerlXKOGN0jupEzIqmKY3lMRNU7QhrS1ce7sWyQNdnHRsSFPjcbvSuXYaifWsqJKurmqpVzkmkdI7rVcz5HKMu/ORfruz3y61iWIx7FFqO6Nn6jY+WRsUaZve5GtTnVdyFi7JQsttnpKBiboIms61RN6+fMhfRnbvdHGFIjm5x0+c7/wBXi9OROpbOFsfaiu9Pfyj6dVR4qyd7lFiO7nP16fz5iHJwhyWxUgAAAAAAAAAAU414/KjafmSP28xAZPmvH5UbT8yR+3mIDCYSfqr+XXD/APr+xeXzKGaq/l1w/wD6/sXl8wSAAICrmvf/AFmEuqq/4y0ZVzXv/rMJdVV/xgVgN50AeWnCfziz1KaMbzoA8tOE/nFnqUJehIACAq/r02F6sw7ieNiq1vCUMzkTiz79nqeWgNQ0x4RZjjR1dsPoje6ZYuEpHL72ZnfMXtVMupVA87DO6Pr+/C+OLNiFmapQVjJXonKzPJ6drVUw1TBNTVMtNUROimiesckbkyVrkXJUXpRT5hk9PKOpgrKSGrpZGywTxtkie1dzmuTNFTsU+xW3VH0rU1Va4NH9/qmxVlMmza5pHZJNH/hZ/jN5OdN3IWSDEAAA6GIbrSWKxV15r5EjpaKB88rlXLc1M/8A6O+VU1utK9NcGOwBh2qbNCyRHXWojdm1zmrmkKLy5Lvd0oic4Fdb9cp7zfK+71S5z1tTJUSdb3K7+J0gduy22svN3o7TboVmrKyZsMLE5XOXJAyWz1ILC+iwPdsQSs2VuVYkUSqnHHEmWf7TneYsIYPAWHabCWDbVhykyWOhpmxK5Pfv43O7XKq9pnAxAAB5xaVKJ1u0mYmontVFiulRuXmWRVT0Ka0TTri4afZtK7ruyPKlvVO2drkTdwjERj069zV/WIWCVrdRS5xvseJbMrk4WKqiqWt52uZsqvnYnnLKnn7oBx2mj/SLSXWpc73NqGrS16Jvyicqd9ly7Koi9SKX8o6mnrKSKrpJo56eZiPikjdtNe1UzRUVONAiX2AAArBr23OLgcL2VrkWXbnqnpnxNyaxv/d5iy9wrKW30M9dXVEdNS08aySyyOyaxqJmqqp5+acMbrj7SLX3yPbShblT0LHblSFmeS5ciuVVd2ghpBueg6jfX6YMK0zEz/8AM4pF6mLtr6GmmE7almG33PSTU4gkjVaez0rtlypu4WXvWp+ztqErmAAIDF4s8Vbv8hm9m4yhi8WeKt3+QzezcB5oN8FOo5OG+CnUchkvDqp2+gqNB9mlnoaWV6yVGbnwtcq/hncqoZvTHorsGOMJVdLBbaOlvEcavoauOJrHNkRNzXKib2rxKi8+ZjtUvyF2X9JUe2eSuGLzDraWooa2eirIXwVNPI6KWN6ZKx7VyVF6lQ+JYzXM0ee514ix7bIMqWvckNxa1NzJsu9k6nImS9KdJXMJW/1PtJLr5Y34JvFSr7jbY9uifI7N01PxbOfKrOLqVOYsGeaWEb/ccL4loL/apeDrKKZJGczk5Wr0KmaL0KeiGAsT27GWErfiO1vzgq4kcrM98b03OYvSi5oCWdAAQEM64WHn3nRFLcIY1fNaKllXu4+DXNj/AEORewmY6t2oKW6WuqtlbGktLVwvhmYvvmORUVPMoHmOfqN74pGyxOVsjHI5rk5FTeimf0jYVrcFY0uWG65rtqllVIpFTdLEu9j060y7czXgyejmi7E8GMcA2fEML0V1VTt4ZEXwJW969q9TkU2YpZqsaVocFXmTDl+qFjsVykRzJXL3tLPxbS8zXbkXmyRecujG9kkbZI3NexyIrXNXNFReJUUMX6OhiGz27EFkq7Nd6VtVQ1caxzRO4nIvqXlRTvgCEHasGjZXKqTX1qKu5ErE3f7SJdZjRHhXR1hy03CwSXF81XWOhk7pnR6bKMV25Eam/NC5JXbXp8ScPfOTvZOAqMTNqbeWqL5uqP8AtIZJm1NvLVF83VH/AGhMruAAICpWvX414Z+Qze0QtqVK16/GvDPyGb2iAhXIk3Vb8u2HPjT+wkIyJN1W/Lthz40/sJAlfUABAAAAAAEJa42KvcPRelkgk2aq9zJBki7+Bbk6Rfqt/WJtKO62+Kv6RaWaiggk2qSyxpRsyXdwnhSL+0uz+qBD4Bt+ANGuMsd0tVVYYtTayGkkSOZ7p2RojlTNETaVM93MGTotxzjVrUa3F1+a1EyREuEuSJ+0c/07xt8L7/8A+4S/zG6fe86Wfg7D+/w/zD73nSz8HYf3+H+YI5NL/p3jb4X3/wD9wl/mMNcq+uudY+tuNZUVlVJltzTyK97skyTNV3ruJN+950s/B2H9/h/mOjf9B2kyx2WsvFysEcdHRxOmneyrierWJxrso7NcugCNye9SvFXuXj6swzPJs094g2okVd3DxZqnnarvMhAhksLXmpw9iS232jVUnoKllQzp2VzVO1M07QPTAHTslxprvZ6K60T0fTVkDJ4nc7XNRU9Z3AgAAAGj4p0s6PcMX73DvWJKenr0VEkjRj3pFnxbatRUb2m40FZS19FFW0NTFU00zUfFLE9HMe1eVFTcoH3AAEOazOjC1YtwdX4gpKWOC/2yndPHPG3JZ2MTN0b+fci5LxovQUgTemZ6QaTLjT2nR5iG41LkbFDbp1VV5VVioidqqidp5vN8FOoJgd4K9R6TaPKl9bgHD9XKqq+a2U73KvKqxtzPNtrHSOSNiKrnLstROVVPS3CNCtrwpaLa5MnUtDDC5OlrERfUCWUAAQA6d5udvs1rqLpdayGjoqZm3NPK7ZaxOk1jBWlHAeMbg+34fxDT1NY3NUge10T3onK1Hom12AbmAAPjWU1NW0ktJWU8VRTytVskUrEc16LxoqLuVCjms7o6osAY2hdZ2rHaLrG6eniVc+Ae1cnxovMmaKnQuXIXpKo69dxgkveGbUxyLPBTzTyInG1r3Na3z7DvMCFaybtS2qkh0wSwNcqMqLZM16c+TmOT1EIk8aklufU6T7hcMvwdFbHoq/nPe1ETzI7zBMrlAAIDTtLtx7iwm6ma7KSskSJPipvd6su03Eh7TNce6cRw0DXZspIu+T8929fRkajXMj2GFXMdZ5fn+27b6Fje3zaInpHP8v32aMAOrec2dMSroSt3B0FbdHt3zPSGNfzW719K+gkUxOELd7lYaoKFUyeyJFk+Mu9fSpljqWmY/wBmxaLfftz8Z5y5XqeT9py67ndvy8I5QIcnCHJ7ngAAAAAAAAAABTjXj8qNp+ZI/bzEBk+a8flRtPzJH7eYgMJhJ+qv5dcP/wCv7F5fMoZqr+XXD/8Ar+xeXzBIAAgKua9/9ZhLqqv+MtGVc17/AOswl1VX/GBWA3nQB5acJ/OLPUpoxvOgDy04T+cWepQl6EgAIAABVHW70VS01dNpCsFMr6adU91oY2/1T+LhsuZffcy7+VStZ6fzxRTwvhmjZLFI1WvY9ubXNXcqKi8aFUNOurtWUM9RiDR/TuqqJyrJNa2rnJDzrF+M383jTkzCVcGOdG9skbnMe1Uc1zVyVFTiVF5FJ20a6y2KMP00VvxNSNxDRxojWzLJwdS1Ol2So/tTPpIKmjkhmfDNG+KVi7L2ParXNXmVF4lPyBdO26zujeoha6rjvVFIqb2PpEeidrXKfi66z+jumhctDT3qvl5GtpkjRe1zk9RS8A2TVpQ1isW4rpprZZYW4etsqK1/AyK6okavIsm7ZT4qJ1kKg+tHTVFZVR0lJBLUVErtmOKJiue9eZETeoHyLW6oeiqW3xt0gYgpljqZo1ba4JG5KyNyb5lTkVybm9Ga8qHU0Dau0sVRT4k0g07UVipJTWld+/jR03J+p5+Ys+1Ea1GtREREyRE5AOQAEAAAjXWL0frpA0fTU1HGi3egVamgX8ZyJ30ef5ybutEKEzRyQzPhmjfHLG5WvY9MnNcm5UVORT1AK+axughcTzz4swdFHHeXJtVdFmjW1eXvmrxJJ6HdfGTCoBKGiHTZirR7E23Roy62VHZ9xVDlTg+fg38berenQRtcKOrt1bLQ19LNS1ULlbLDMxWPYqciou9D4AXKs+tJgKpgR1ytt6t83vmJC2VvYqO/gh+b1rS4FpoHLa7XerhN71romwt7VVyr6Cm4BskvS7pnxVpEatDUqy2WZHbSUFM5cnqnEsjuN69G5OgjQHZtVvr7rcIbdbKOesrJ3bMUMLFe9y9CIB86Snnq6qKlpYXz1Ez0jijYmbnuVckRE51Uv7oEwE3R9o9pbXM1q3OoXum4PTfnK5E73PmamTexV5TR9XPQazBzosT4qZFPf1bnT06KjmUSKnHnxOk6eJOTnJ4BIAAgMXizxVu/yGb2bjKGLxZ4q3f5DN7NwHmg3wU6jk4b4KdRyGS9eqX5C7L+kqPbPJXIo1S/IXZf0lR7Z5K4YsVi2w2/E+G6+wXSLhKSthWKROVM+JydKLkqdKHnbjrDVwwfiy4YcubFSoo5VZtZZJIzja9OhyZKek5X/XF0ee7mGo8a2yDO4WlmzVo1N8tNnnn0qxVz6lXmAp6Trqi6Rv6M4rXCd0n2bVeJESFzl72Gp4mr0I/wV6dkgo5a5zXI5jla5q5oqLkqLzhL1BBF2rbpEbj7AcaVsyOvdsRtPXIq75N3eS/rIm/pRSUQgAAEP6y+ilNIGHmXO0RtTENtYvAcndMfGsSrz8rV593KUhqYJqaokpqmGSGaJyskje3ZcxyLkqKi8Snp8Q9p00HWjH6SXi1PiteIkbvm2fwVTlxJIicv5yb+fMJUeJY0RadcVYDhitk6JerKzc2lneqPhTmjfvyToXNOo0XGuD8SYMujrdiO1T0Muaox7kzjlTnY9Nzk6jAgXhwvrG6NLvEzu6vqrLOqd9HWQOVqL0PZmnqNqj0t6M5I9tuOLHl01SIvmXeeegBsvlf9Pmi20wuemI23GROKKhhdK5e3JG+krbrB6ZYtJlPRWygsr6Cgop1mZLNLtSyKrVbvRNzUyXnUh8A2CZtTby1RfN1R/wBpD1JTVFZVR0tJBLUVErtmOKJiue9eZETepa3Vb0N4jwtfW4zxKraCV1M+GC35bUuT8s3SLxN4vB3rz5AlZAABAVK16/GvDPyGb2iFtSpWvX414Z+Qze0QEK5G5aFcT27B2ky0YjuzZ30dGsiyJAxHP76NzUyRVTlcnKaaAyXQ++h0c/5S/wD7oz+cffQ6Of8AKX/90Z/OUvARsuh99Do5/wApf/3Rn85lMJ6wuBcTYlt9gt1NeW1dfMkMKy0zWsRy867a5IUbN40BeWjCfziz1KDZ6FAAIYTHmIKfCuDbtiGpVNihpXyoi++cid63tdknaeb1dVT11bPW1UiyVFRK6WV68bnOVVVfOpbHXexT3Hha14Sp5MpbjN3TUIi/9KPwUXreqfslSAmAvnqwYa/o1odtLZY9ipuKLXz5pvzk8H/YjSk+ArDLijGlnw/EiqtdVxxOVORmeb17GoqnpHTQRU1NFTQMRkUTEYxqcSNRMkTzAl9AAEB8LhSQV9BUUNUxHwVETopGrytcioqeZT7gDzSxhZZ8OYqulhqEVJKCqkgXPlRrty9qZL2mKJ110cNe5Wkqmv0MezBeaVHPVE3cNHk13+3YUgoJXT1N8Ve7ejF1jnk2qqyTrCiKu/gX5uYvZ3ydhN5RvVKxV/R3S1TUM0mzSXqNaKTNd3CeFGv7SZfrF5AgNI0148pdHuBKu9PVj66T8DQQuX+smVN27mTwl6E6TdyPdOGi+3aTMPx0s1Q6judHtOoarerWOXLNrm8rVyTPlTLdzAUGuFXU3CvqK+tnfPVVEjpZpXrm573Lmqr2m7aKdK+LNHdTs2qpSqtr3Zy2+pVVidzq3lY7pTtRTC4+wRibA12dbsR22SmVVXgp0TahmTnY/iXq405UNcCV1cI6y+j660zPdp1ZYqrLv2TRLLHn0PYi5p1ohnq/T5oopKdZUxSypXLNI4KaVzl/2lDADZNWsBpyqNIFL/R+x0s1vsLZEfKsqpw1UqL3u0ibmtTj2d+/jIVBl8I4aveLL5DZbBQS1tZMvgtTvWJyucvE1qc6gbhq5YOlxlpTtkD4VfQW96Vta7LvUYxc2tX4zsk85fs0LQjo3t+jbCaW6J7am5VKpLX1aJlwj8tzW8zG8SJ1rym+hAAAKh64ukf3YvjcC2mfOgtz0fXuYu6Wo5GdTPrL0FfaaeamqI6mmmkhnicj45I3K1zHJxKipvRSyOn7V8uEVfV4owLC+sgme6aqtuecsblXNzo8/CRV37PGnJnyVtmikhmfDNG+KWNytex7Va5qpyKi70UJhYbRdrN3W1QRW3G9FJdqdmTUr4MkqET89q7n9e5esmm3aftFNZAki4obSqqZrHUU0rXJ/tVPSUNANl1cZ6yuALTRSe4UlTfq3JeDZFE6KLP8570Td1IpUXHGJ7tjHE9ZiG9TJJV1Ts1Ru5sbU3NY1ORqJuMIABdPU7wdLh7R1JfK2JY6u+yJM1HJkrYGplH583O6lQhTV30LV+NrlT36/wBNJTYZhej+/RWurVT3jfzOd3YnRdeGOOGFkMTGxxsajWMamSNRNyIicwJfsABD8yvZFG6WRUaxjVc5V5EQrne651yu9XXvXfPK56dCKu5PNkTRpNuPudg+rVrspKjKBn63H6MyCyl8U5G9yizHdzn6rtwrjbW6789/KPp1/nyDNYHt3upiqgpVbtRpJwknxW719WXaYUkrQjbtqavur2+CiQRr0rvd/wBpotLx/tGXRR3b7z4Rzb3Vcn7NiV3O/baPGeSUAAdRcsEOThDkAAAAAAAAAAAIQ0/aErlpKxdR3ujv1Jb46egbSrHLA56qqSSO2s0Xi79E7COvvTr78Mbb+6P+0tmoArxoi1ertgjSDbcT1OJaGsio+E2oY6d7XO2mObuVV6Sw4AAAACJNYXRLX6T3WZaK801u9z0l2uGhc/b29niyVMstklsAVM+9Ovvwxtv7o/7TYNHGrdeMK46s+I58UUFTFb6ls7omUz2ueiZ7kVV3cZZMAAAAAAAAAaVpB0W4IxyjpL7Zo1q1TJKynXgp0/WTwv1syEsSap7uEc/DeLURi+DFX0+9OjbZx/slogBSur1YdJET1bDNY6hvI5tW5ufnah+qLVg0jTSI2epsdM3lc6qc7LsRhdIA3ViwxqoQNe2TEuK3ytTwoaCDZz/Xfn9UnDAOjjBuB4dnD1lggnVMn1Un4Sd/W9d/YmSG2gAAAAAAAAAAANTx/o6wfjqn4PEVnhnmamUdVH+Dnj6npvy6FzToIKxRqoZyOkwzivZYq97DcIM8ujbZx/sloQBSmr1Y9JUMithdZalqcTmVatz/AGmoc0erHpJmkRs8lkpmrxufVq7L9lql1QDdWHC2qhG2RkuJ8VOkai99Bb4dnPo23/yk7YCwBhLA9IsGHLPBSvcmUlQ7v5pPjPXf2cXQbQAAAAAAAdS80jq+0VtCx6MdUU8kSOVM0armqmfpO2AKlpqnX1ERP6Y2390f9pz96dffhjbf3R/2lswDdp2hvB9RgTR/Q4Zqq2KtlpnyuWaNita7beruJes3EAAfieKKeGSCaNskUjVY9jkzRzVTJUVOY/YArTjTVWo6y7zVeFsRJbqWVyuSkqYFkSLPka5FRcuZFTtMF96dffhjbf3R/wBpbMAV90PaCsV6O8a09+pcW2+enVqxVlMlM9vDxLxpnnuVFyVF50LBAAAAAAAHSvNptl6oH0F3t9LX0siZOhqIke1exSGMYaseBbtI+eyVVfYZXLnsRO4aFP1Xb07HE6ACoV31VMWQuctrxHZ6xnIkzZIXL5kchg36suk1HZI2zOTnSsX+UuyAbqZ27Vbx/O9Eq7lYqNvKqzPkXzI3+JvOGdVG0wvZJiPFFXWZeFDRQpC1f1nbS+hCyYA1bA2j3B2CodjDtjpqSVUydUKm3M/re7NeziNpAAAAAQ1rB6HLjpOvFqrqK90tubQ074nNmhc9Xq5yLmmSpzEygCpn3p19+GNt/dH/AGj706+/DG2/uj/tLZgG6pn3p19+GNt/dH/aPvTr78Mbb+6P+0tmAbqmfenX34Y2390f9pn9HOrbeMLY6s2Ip8UUFTFb6ps7omUz2ueiZ7kVV3FlAAAAFf8ATPoHxFpDx3U4hXFNBS06xMhpqd9O9yxRtTizz41crl7TTPvTr78Mbb+6P+0tmAIa0H6CLZo8urr9cLl7r3hGLHC9IuDip0Xc5Wpmqq5U3ZryZ7iZQAAAAAADTNL2ju0aSMMJaLnJJTTQv4Wkqo0RXQvyyzyXjRU3KnL2EAyap17214PGVvVue5XUb0X6xbEAVSotVfElFWQVlNjS3RzwSNlielI/Nrmqiovhc6FqaZJkp4kqHMdMjE4RWJk1XZb8ujM+gAAADpXq1Wy9W+S33egpq+kkTJ8M8aPavYpCONNV/B90kfUYduNbYZXb+C/r4M+hHLtJ+0T2AKb3bVax1TvX3Pu1kro+RVkfE7zK1U9J0afVj0lSSI2R9khbyudVquXmapdYA3VgwlqpMZMybFeJ+FjRc3U9vi2dro4R/wDBpYDBODsN4MtaW7DdqgoYly23NTOSVed713uXrUz4AAAAAABpWkHRbgjHLXPvtmiWrVMkrKdeCnT9ZPC/WzN1AFWsTaqEqSOkw1ixisXwYrhBvTo22cf7Jp1Rqx6So5FbG+yTN/GbVqiL52oXWAFOLRqs45qZE90rvZKCPPerXvld5kaieklzR5q4YJw3PHW3l82Iq1io5vdLUZA1eiNOP9ZVJrAH5jYyKNscbGsYxEa1rUyRETiREP0AAAAGMxDYrdfqVlPcYnvax20xWvVqtXLLPd/E0S76LF3vtVzz5o6hv/cn2EnA8GXpmLlzvdo5/HpLYYmqZWJG1qvl8OsIBu+EsQ2vadU22V8af9SH8I30cXaS9o8tq2zCNFC9uzLI3hpE5c3b/VkhsAPLgaLawb03aJmd4259z1ahrd7OsxariI2nfl3gANy0ohycIcgAAAAAAAAAABwoCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhycIcgAAAAAAAAAABwoCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPw+WJi5PlY3rciBkkb/Ae13UuZG8dE7S/YAJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIcnCHIAAAAAAAAAAAcKAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpWlHFD7NQtt1DJs11S3NXpxxM4s+teJO08+XlUYtqbtzpD04mLcyr0WrfWX7xljyhssj6OiY2trm7nIi95Gv5y8q9CEZ3jFuILo53dFxljjX/pwrwbU83H2mDVVVVVVVVXeqqbXg/A9xv8bauV/cdCq7pHNzc/4qfxUoV7PztUu9i3vt8I9f3X6zp+Dpdr2lzbf4z1+n7NVe5z1ze9zl53LmfqKWWJyOilkjVOJWOVF9BMlLo2w3FGiStq6h3K502XoTI+dbozw/MxUp5KumfyKkm0nmU+v9N50R2uW/i+X9S4Mz2ee3hy82gWTG+IbW9qJWuq4U44qjv0y6+NPOSng/F1uxFHwbP/AA9a1M307139bV5UIzxLgO9WhVkgjW4U2e6SBqq5OtvH5szb9E+F5bfE+8XGB0dVKmxDG9MnRs5VVORV9XWe3SK9RtZUWK4ns9+/dHyn+Q8WsW9NvYs5FuY7Xdt3z848+9IAALmpQAAOFVERVVURE3qqkA4pvlVc8Q1tZFVTsifKqRNbIqIjE3JuToTMlzSPdPcrCdVIx2zNOnARc+buNexMyCWtVzka1M1VckQp3E+XPaosUz859PVc+FsSOzXkVR8o859HaguVwgnjmjrajbjcjm5yuVM0XPnLCWeujuVqpa+LwJ4mvTozTennK9XWimttynoKhPwsD9lxKOhe6d0Waotcjs30r9tiL+I77Fz858OHMmq1k1WK/wDt5x/JffiTFpu4tN+j/r5T/Ib+AC8KKAACO9Nk00NFbFhmkiVZZM9h6tz3JzEYLW1uS/8Ajan6Z32kl6cv7Fav0sn1UIsXiU53r9VUZ9e0/Dyh0fh6mmcCjePj5ysdYVV1joHOVVVaaNVVeXvUO6dHD/8AcNv+TR/VQ7x0Cz93T4Q55e+8q8ZAAfR8wwWP3vjwbdHse5jkgXJzVyVN6GdMBpC8Srr+gX1oebN92ufhnyenC95t/ijzQZ3bW/52p+md9pLuhyWWbC0zpZXyO7qemb3Kq8TechomLQt4qTfK3/VaUjhyqqc2N57pXniSmmMGdo74bwADoDnoAACEAYsrKtuKLo1tXUNalXIiIkrkRO+XpJ/Qrzi/xquvyuT6ylW4pmYs29vj6LVwrETeub/D1dPu2t/ztT9M77R3bW/52p+md9pmdHtqo7ziWOhr2OfA6J7lRrlauaJu3oSX9zrC3+Un+ncaDC0nKzbftLdUbb7c5lYM7V8XCuezuUzvtvyiP9ob7trf87U/TO+07tgrKx19t7XVdQqLVRoqLK7Je+TpJX+51hb/ACk/07j60uAcNU1TFURUsySRPR7FWdy70XND32+Hc6muJmqPzn/TwXOI8GqiYimfyj/baVABeVECB8d1dWzGN0YyqqGtSdckbK5ETcnSTwQDj7xzuvyhfUhWeKJmMejb4+krRwrETkV7/wDz6wxfdtb/AJ2p+md9oSurkXNK2p+md9plcBW+kumKqShrouFgkR+03NUzyaqpvQlV2AMKqmXuaqdKTP8AtK9gaVk51ubluqNonbnM/wCliz9WxsG5Fu5TMzMb8oj/AGiKhxJfqJyOp7vWNy5HSK5vmXNDesJ6SVlnZSX+ONiOXJKqNMkRfzk5OtDq430ew0FvluVmklcyFNqWCRdpdnlVq9HMpHRNV7P0m9FNVX033if5+bGmxp+rWZqppjx22mJ/n0WZaqOajmqioqZoqcSnJpmiK6SV+GFppnq6Sik4JFXj2FTNvm3p2G5l+xMinJs03ae+HP8ALx6sa9VZq7pCI9LdvrLbeWXGmqKhlNWcaNkciNkTjTj5U3+clwxGLrPHfbBU292SSObtQuX3r04l/h2nl1XDnLxqqKf/ACjnHj+71aTmxiZNNdX/AIzynw/bqgqhvF0oquOqp6+obJGuaZyKqL0KirvQsBZa+O6WmluEWWzPGj8uZeVOxc0K5yxyQyvilYrJGOVrmrxoqcaEq6Fbrw1tqrRI7vqd3CxJ+Y7j8y+sq/DeZVbyJs1zyq84WriXCpuY8X6I50+U/ukM0/SrfZrPYmQUcyxVVW/Ya5q981ieEqcy8SdpuBB+lK6+6eLJo2OzhpE4BnWnhL5/UWHXcucbEnsztNXKPX9Fd0HDjJy47Ub00859P1a6tdXKua1tT9M77SYNFNrqKSw+6FbJK+etyc1JHquzGng8fPx+YjHBdldfcQ09EqLwKLwk68zE4/PxdpPzGtYxrGNRrWpkiJxIhpeGsSquucivpHKPHvbvifMpoojGo6zznw7v58n6ABc1KAAAQ5OEOQAAAAAAAAAAA4UBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAccW9eIr3i25Pu+I62uc5Va6RWx9DE3N9CE9XqVYbPWzNXJY6eRydjVK3pxIVDiq9MRbtR05z/AD9Vw4UsxM3Ls9eUf79GdwNZkvuI6ejkReAbnJPl+InJ2rknaT5GxkcbY42tYxqI1rWpkiInIRhoNgatTdKlU75rI2IvQqqq+pCUT3cN49NvE9p31T5cnh4lyarmX7LupiP15gB1H3O2se5j7hSNc1claszUVF85v6qqaes7K/TTVV0jd2wdL3Vtf5Sovp2/afSC4UE8iRQVtNLIvE1krXKvYikRdonlEwmbVcc5iXZABmwAD51M0dNTS1ErtmOJivcvMiJmpEzERvKYiZnaEUaaLp3Reae1xuzZSs23on47vsTLzmB0d233UxdRxObnFC7h5Opu9PTkYm8V0lyutVXy+FPK5/UiruTsTIkjQlbdikrbs9u+VyQxr0Jvd6VTzHPcffUtU7U9Jnf6R09IdEyNtM0rsx1iNvrPX1liNNFt7nvsFyY3JlXHsvX89u71KnmMNo3unuViyle92zDULwEnNk7iXz5El6Vrd3fhGeVrc5KRyTt6k3O9Cr5iEUVUVFauSpvRU5DPWKKsLUfa0d+1Uev6sNGrpztN9jX3b0z6fos0DFYSuaXjDtFX55vfGiSdD03O9KGVL7auU3aIrp6TG6gXbdVquaKusTsAAzYI305f2K1fpZPqoRYvEpKenL+xWr9LJ9VCLF4lOc8Qe/1/Tyh0nh7/ANfR9fOVjcP/ANw2/wCTR/VQ7x0cP/3Db/k0f1UO8dBs/d0+EOdXvvKvGQAH1fMMBpC8Srr+gX1oZ8wGkLxKuv6BfWh5s33a5+GfJ6sL3m3+KPNAhMWhbxUm+Vv+q0h0mLQt4qTfK3/VaUbhv32PCV64l9xnxhvAAOhOdgAAIV5xf41XX5XJ9ZSwyFecX+NV1+VyfWUqvFX3Nvx9Fr4U++ueHqzeiHx1h/QSeomsrth671VjuTbhRtidM1qtRJEzTJeM2X7puIv8Kg+iX7Tx6LrGNh4827u++8z08Ht1vRsnNyYuWtttojnPimQEN/dNxF/hUH0S/aShhSvnumHaG4VKMSaeLaejEyTPNeIseFq2Pm1zRa33iN+cK1naRkYVEV3dtpnblLKAA2bWBAOPvHO6/KF9SE/EA4+8c7r8oX1IVjin3ejx9JWnhT3mv8PrDt6LfHig6n/UUnMgPAFfSWzFdJW10yQwRo/aeqKuWbVROIlZ+O8Ktaq+6rVy5Eifn6j58OZVizi1RcriJ7U9ZiO6H04kxb97Kpm3RMx2Y6RM98s7dHRttlU6XLg0hers+LLZXMrcnESDjvH8d0oZLXaI5GQS7pppEyVzfxUTkRec0GCKWeZkMMbpJZHI1jGpmrlXkQ1fEGday71NNqd4p7/nLacPYN3Es1VXo2mru+UJQ0GsclDdJVTvHSxtTrRFz9aEjmDwPZPcHDsFE/JZ3ZyTqn468adm5Owzhb9Lx6sfEot1dYjz5qdquRTkZly5R0mfLkAA2DXog0wWPuK8Mu8DMoKzdJlxNkT7U39imAwJdfcfFFHVOdswudwU3xXbs+xcl7CasU2iO+WKpt0mSOe3ONy+9em9q+cr5UQyQTyQTMVkkblY9q8iouSoULWsarBzIyLfSZ3jxjqv+iZNOdhTj3OsRtPhPT+fJYXE1yZaLDWXFypnFGqsTncu5qedUK8Pe573SPcrnOVXOVeVV4zZcR4pnu2GbXa3udt06L3Q5ffq3cz0b+s6uBrKt9xFBSOaq07F4SdfzE5O3cnaYatmTqeRbt2enLbxnr+XT6M9Iw40vGuXL3Xed/COn59fqkvRPY/cywd3zsyqa7J+9N7Y/ep28fabmcNRGtRrURGomSInIhyXjExqcazTap6QouXk1ZV6q7V1kAB6HnAAAQ5OEOQAAAAAAAAAAA4UBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdW7wrUWmsgRM1kgexO1qoVvRFRMl40LNEAY5tTrPiespdnKJz1lhXnY7enm3p2FR4qsTNNu7HSN4/Pot/Cl+IquWp6ztP5dfNtug6dqVd0pVXvnMZInUiqi+tCUiv+Crz7hYip65+fA/1cyJ+IvH5ty9hPsMkc0TJYntfG9qOa5q5oqLxKe3hvJpuYnsu+mf0nm8XEuNVby/a91UfrHJ+yu2K27OJ7o1zcl7rk3Kn5yliTrT2+gnkWSeippXrxufE1VXtVD1avpk6hRTTFW20vLo+qRp9dVU077wrbk3mQ2nRSif05otyeDJ9RT7aWoIKfFyx08McLO52LssajUz38iHy0U+PNF8WT6ilKx7E4+o0WpnfaqI/Vd8jI+0abXdiNu1RM/onEAHTHMA03S5dO4MLOpWOylrX8EnPspvd/BO03IhXS3dO78UupWOziomcEnx13u/gnYafXcr7Ph1bdauUfXr+jc6Di/aMynfpTzn6dP1aeTxhCS1WnDdDQrcaJHsiRZPw7fDXe7l51IHRFXiRV6hwa/4a/slK0zUZwK5rijeZjZd9U06M+imia+zETusVUXCz1FPJBLcaJ0cjFY5OHbvRUyXlK+XCn7kr6il22vSKRzEc1c0ciLuVFPhwa/4a/snKoqcbVTrQ+mqapOoRT2qNph89L0qNP7XZr3ifl8EmaErpurLPI7/ANeJPQ5PUpJpXvCFzW0Ykoq9VyYyRGy/EduX0Ln2Fg0VFRFRc0XiUtHDeV7XF9nPWnynoqvEuL7HK9pHSuN/rHX0cgAsKuo305f2K1fpZPqoRYvEpKenL+xWr9LJ9VCLF4lOc8Qe/wBf08odJ4e/9fR9fOVjcP8A9w2/5NH9VDvHRw//AHDb/k0f1UO8dBs/d0+EOdXvvKvGQAH1fMMBpC8Srr+gX1oZ8wGkLxKuv6BfWh5s33a5+GfJ6sL3m3+KPNAhMWhbxUm+Vv8AqtIdJi0LeKk3yt/1WlG4b99jwleuJfcZ8YbwADoTnYAACFecX+NV1+VyfWUsMhXnF/jVdflcn1lKrxV9zb8fRa+FPvrnh6ucK2WS/wB4bbo52wOcxz9tzc03G4/cqrPyxT/Qr9piNEPjrD+gk9RNZ5tD0rFy8abl2ned5jrPyenXdWysTJi3aq2jaJ6R80V/cqrPyxT/AEK/aSHhu3OtNio7a+VsrqePYV6Jki7+YyILHiaXjYdU12adpnl1lW8zVMnMoii9VvEc+kAANg14QDj7xzuvyhfUhPxAOPvHO6/KF9SFY4p93o8fSVp4U95r/D6wxFLT1FVO2Clhknld4LI2q5y9iH1rbbcaFrXVtDU0zXLkiyxK1FXtM7ot8eKDqf8AUUma+W2nu9qqLfVNzjmblnytXkcnSimk03RYzsaq7FW1UTMRHd0hu9S1ucHJptTTvTMRMz39ZVzbltJtKqJnvVEzJn0b2HD1Pb47rbZVrZpEyWeVMnMXlajfer/+zIhutDUWy4z0FU3ZmgerXdPMqdC8ZsmjDEPuLekpah+VFWKjH5ruY/3rv4L/APR8tGv28bLiL9Py3nul9tasXcrDmbFU/HaP+0JsAB0dzUAAAiLTHZEo7rFd4GokVZ3sqJySInH2p6iXSP8ATd/cVB8qX6qmn161Tcwa5q7ucNzoF6q3nURT38pRKTToosiWzDrayVqd012Ui9DPep/HtIWXiLD4U8WLX8ki+qhXOGLNNeRVXPWmOX1WTim9VRjU0R0qnn9GTABe1CAAAAABDk4Q5AAAAAAAAAAADhQFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANW0i4YTENsSSmRqV9OirCq7ttOVi9fJ0m0g+ORj0ZFqbVyOUvvjZFzGuxdtzzhWieKWCZ8M8bo5WOVr2OTJWrzKbPg7G1xw+xKV7Eq6HPdE52TmfFXk6uIk7FuELXiFvCStWnrETJtRGm9ehye+QjO86P8RW9zlggbXxJxPgXf2tXf6yjXtLztNu+0sbzHxj1j+QvdnVcDUrXs7+0T8J9J/kt9otJGGp2Is0lTTO5WyQquXa3M5rNI+GYWKsU1RUu5Gxwqmfa7Ihyro6ukfsVVNNA7mkYrfWfmnp56l+xTwSTP/FY1XL6Cf6jzo/t2jfwnfzY/wBNYE/37zt4xt5MrjO+JiG9uuDadaduw2NrFdtLkme9fOd/RT480XxZPqKfi0YFxJcHtzoVpI145KhdnLs4/QSVg3BNvw+9Ktz1qq/LLhXJkjM+NGp/EjTtPzMnLpyLlO0bxMzPLv35Go6hhY2JVj26t52mIiOfdtzltQAL+5+6d5ro7Zaaqvly2IInP61RNydqldamaSoqJaiZ21JK9XvXnVVzUmDS4+vlskNtoKSonWok2pVijV2TW78ly51y8xF0eH77JI1jLPXK5y5JnCqespHEly5ev02qKZmKY+HfP8heOGrduzj1Xa6oiap+PdH77t50J2xrkr7rKxFTdBHmna7+BJfBR/4bP2UMTgu0usmG6SgkRqTNarpsl9+q5r9nYZks2l4v2bFotzHPbefGeasarl/acuu5E8t9o8I5PxwUf+Gz9lDUNLVrbV4UfUxRt4Sjeku5N+zxO9efYbkfGtp46ujmpZUzjmjdG5OhUyPRl41ORYrtfGHww8mce/RdjulWsnfRzdPdXCdJI921NAnAS9beJe1MlIhuOF79Q1klM+2VUmw5UR8caua5ORUVDc9D7bpbrjVUNZQVcNPUMR7XSRKjUe3pXnRfQUrQaruLmdiumYirlPLv7l21+mzlYfboqiZp5xz7u/8AnyScAC/Ofo305f2K1fpZPqoRavES1pmoa2to7alHST1CslerkiYrstyceRG3uFe/yRXfQO+w57r1q5VnVzFMz07vlDovD963TgURNUR17/nKRLZpKs9LbaWmfRVyuhhZG5URuSqiInOdj7qNl/yFf5m/aRn7hXv8kV30DvsHuFe/yRXfQO+wzp1nUqYiIj/F86tE0yqZmZ/ySxZdINqut1p7dBR1jJJ3bLXPRuSbs9+/oNxIRwJaLtT4vts09srIo2S5ue+FyIiZLxqTcWbRcvIyrNVV/rE/DbuVjW8THxb1NNjpMfHfvkMBpC8Srr+gX1oZ8wmO4ZajCFzhgifLI+HJrGJmqrmnEhsMyN8e5EfCfJrsKdsm3M//AFHmgA3vAGNLdh6yvoaqmqpZHTukzjRuWSoicq9BqvuFe/yRXfQO+we4V7/JFd9A77Dm+JXk4lz2lqmd/B0vLt4uXb9ndqjbxSZ91Gy/5Cv8zftC6UrKiZ9wV/mb9pGfuFe/yRXfQO+w4dYr3kv/AJRXfQO+w2f/ADep/D/Fq/8Ag9L+P+Sw1NK2opop2oqNkYj0ReNEVMz6HWtTXMtdIx7Va5sDEVF40XZQ7JfKJmaYmVBriIqmIEK84v8AGq6/K5PrKWGIIxVZrvLia5yxWusfG+qkc1zYXKiorl3puK1xPRVXat9mN+fos/C1dNF652p25er5YCvFJY8RR3CtSVYWxvaqRtzXNU3cpIv3TcO/4Vf9Cn8xFvuFe/yRXfQO+we4V7/JFd9A77DQYeoZ2Hb9nap5b79JWDN07BzbntLtXPbblMJS+6bh3/Cr/oU/mPrSaRrBU1UNNHHXbcr2sbnEmWarknKRR7hXv8kV30DvsO5YrJeGXugfJaq1rG1MaucsLkRE2k38R7beuajVVETT/i8NzQtNpomYq/yhPoALyogQDj7xzuvyhfUhPxB+N7Pdp8XXOaC2Vksb51Vr2QuVFTJOJStcT0VV49EUxvz9JWbheumjIrmqduXrD8aLfHig6n/UUnMhnRtabpTYyopqm3VcMTUfm98Soid6vKTMZ8M0VUYtUVRt/dPlDDieumvLpmmd/wC2POUd6YsP90UjL7TMzlgRGVCInhM5HdnqXoIpLLzRRzQvhlYj45Gq1zV4lReNCD8UYNu9ruksdLQ1FVSOcqwyRMV3e8iLlxKhrOItMqi59otRvE9dvj8fr/OracOapTNv7Pdq2mOm/wAPh9PLwSFotxF7sWbuOpkzraNEa7Pjez3rv4L/APZuJBGGYcRWO9QXGC0V67C5SM4B3fsXjTiJzp5WzQRzNRzWvajkRyZKmfOnIputDzK79jsXYntU8uffHdLSa7hUY+R27Ux2aufLunvj/T6AA3bRhH+m7+4qD5Uv1VJANG0xUdXW2WiZR0s1Q5tTmrY2K5UTZXfuNZrNM1YVyI+Hq2mjVRTnW5n4+iHl4iw+FPFi1/JIvqoQQtiveX90V30DvsJ5wzG+LDltjkY5j2UsaOa5MlRdlNylf4Xt10XbnaiY5eqw8U3KK7VvszE858mRABc1KAAAAABDk4Q5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==";

// ── Palette ───────────────────────────────
const C = {
  orange:"#F26419", black:"#111111", charcoal:"#444444",
  grey:"#888888", lightGrey:"#CCCCCC", border:"#E8E8E5",
  bg:"#FAFAF8", white:"#FFFFFF",
};

// ── Fonts ─────────────────────────────────
const injectFonts = () => {
  if (document.getElementById("hg-fonts")) return;
  const l = document.createElement("link");
  l.id="hg-fonts"; l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(l);
};

// ── Image compression ─────────────────────
const MAX_PX = 1600;
const TARGET_KB = 800;
const MIN_QUALITY = 0.45;

function compressImage(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        let { naturalWidth:w, naturalHeight:h } = img;
        const origW=w, origH=h;
        if (w>MAX_PX||h>MAX_PX) {
          const r=Math.min(MAX_PX/w,MAX_PX/h);
          w=Math.round(w*r); h=Math.round(h*r);
        }
        const canvas=document.createElement("canvas");
        canvas.width=w; canvas.height=h;
        canvas.getContext("2d").drawImage(img,0,0,w,h);
        let lo=MIN_QUALITY, hi=0.92, best="";
        for(let i=0;i<8;i++){
          const mid=(lo+hi)/2;
          const d=canvas.toDataURL("image/jpeg",mid);
          const kb=Math.round(d.length*3/4/1024);
          best=d;
          if(kb>TARGET_KB) hi=mid; else { lo=mid; best=d; }
          if(hi-lo<0.02) break;
        }
        if(Math.round(best.length*3/4/1024)>TARGET_KB)
          best=canvas.toDataURL("image/jpeg",MIN_QUALITY);
        resolve({dataUrl:best, origW, origH, newW:w, newH:h,
          kb:Math.round(best.length*3/4/1024)});
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ── Supabase helpers ──────────────────────
const sbHeaders = {
  "apikey": SB_KEY,
  "Authorization": `Bearer ${SB_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation",
};

async function sbQuery(table, opts={}) {
  let url = `${SB_URL}/rest/v1/${table}?`;
  if (opts.select)  url += `select=${opts.select}&`;
  if (opts.filter)  url += `${opts.filter}&`;
  if (opts.order)   url += `order=${opts.order}&`;
  if (opts.limit)   url += `limit=${opts.limit}&`;
  const res = await fetch(url, { headers: sbHeaders });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbInsert(table, data) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method:"POST", headers: sbHeaders, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbUpdate(table, id, data) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}?id=eq.${id}`, {
    method:"PATCH", headers: sbHeaders, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbDelete(table, id) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}?id=eq.${id}`, {
    method:"DELETE", headers: sbHeaders,
  });
  if (!res.ok) throw new Error(await res.text());
}

async function sbUploadImage(bucket, file, dataUrl) {
  // Convert base64 dataUrl to blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const ext = "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadRes = await fetch(`${SB_URL}/storage/v1/object/${bucket}/${path}`, {
    method:"POST",
    headers:{ "apikey":SB_KEY, "Authorization":`Bearer ${SB_KEY}`,
      "Content-Type":"image/jpeg", "x-upsert":"true" },
    body: blob,
  });
  if (!uploadRes.ok) throw new Error(await uploadRes.text());
  return `${SB_URL}/storage/v1/object/public/${bucket}/${path}`;
}

// ── QR ────────────────────────────────────
function QRCode({ text, size=140 }) {
  const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=fafaf8&color=111111&margin=4`;
  return <img src={url} alt="QR" style={{width:size,height:size,display:"block"}}/>;
}

function AvailBadge({ value }) {
  const colors={Available:"#1a7a3c",Sold:C.grey,"On Loan":C.charcoal,NFS:C.grey};
  return <span style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:colors[value]||C.grey}}>{value}</span>;
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function HourglassGallery() {
  useEffect(()=>{ injectFonts(); },[]);

  const [artists,  setArtists]  = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  const [screen,    setScreen]    = useState("home");
  const [curArtist, setCurArtist] = useState(null);
  const [curWork,   setCurWork]   = useState(null);
  const [search,    setSearch]    = useState("");

  // ── Load data from Supabase ──
  const loadData = async () => {
    setLoading(true); setError("");
    try {
      const [a,w] = await Promise.all([
        sbQuery("artists","select=*&order=name.asc"),
        sbQuery("artworks","select=*&order=created_at.asc"),
      ]);
      setArtists(a||[]); setArtworks(w||[]);
    } catch(e) {
      setError("Could not connect to database. Check your Supabase settings. "+e.message);
    }
    setLoading(false);
  };

  useEffect(()=>{ loadData(); },[]);

  const navToArtist = id => { setCurArtist(id); setScreen("artist"); window.scrollTo(0,0); };
  const navToWork   = id => { setCurWork(id);   setScreen("artwork"); window.scrollTo(0,0); };
  const navHome     = ()  => { setScreen("home"); window.scrollTo(0,0); };
  const navAdmin    = ()  => { setScreen("admin"); window.scrollTo(0,0); };

  if (loading) return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.bg,gap:20}}>
      <img src={LOGO_DATA_URL} alt="Hourglass Gallery" style={{height:30,objectFit:"contain"}}/>
      <div style={{fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:C.grey}}>Loading catalogue…</div>
      <div style={{width:200,height:1,background:C.border,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:0,top:0,height:"100%",background:C.orange,width:"40%",animation:"slide 1.2s ease-in-out infinite"}}/>
      </div>
      <style>{`@keyframes slide{0%{left:-40%}100%{left:100%}}`}</style>
    </div>
  );

  return (
    <div style={{fontFamily:"DM Sans,Helvetica Neue,Arial,sans-serif",background:C.bg,color:C.black,minHeight:"100vh"}}>
      {error && <div style={{background:"#fff0f0",borderBottom:"1px solid #ffcccc",padding:"10px 40px",fontSize:12,color:"#cc0000"}}>{error}</div>}

      {screen!=="home" && (
        <nav style={{position:"sticky",top:0,zIndex:100,background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 40px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div onClick={navHome} style={{cursor:"pointer"}}>
            <img src={LOGO_DATA_URL} alt="Hourglass Gallery" style={{height:24,objectFit:"contain",display:"block"}}/>
          </div>
        </nav>
      )}

      {screen==="home"    && <HomeScreen    artists={artists} artworks={artworks} search={search} setSearch={setSearch} onSelectArtist={navToArtist} onSelectWork={navToWork}/>}
      {screen==="artist"  && <ArtistScreen  artists={artists} artworks={artworks} artistId={curArtist} onBack={navHome} onSelectWork={navToWork}/>}
      {screen==="artwork" && <ArtworkScreen artists={artists} artworks={artworks} artworkId={curWork} onBack={()=>{setScreen("artist");window.scrollTo(0,0);}}/>}
      {screen==="admin"   && <AdminScreen   artists={artists} artworks={artworks} setArtists={setArtists} setArtworks={setArtworks} onBack={navHome} reload={loadData}/>}
    </div>
  );
}

// ── Nav helpers ───────────────────────────
function NavBtn({onClick,children,active}){
  const [h,setH]=useState(false);
  return <button onClick={onClick} onMouseOver={()=>setH(true)} onMouseOut={()=>setH(false)}
    style={{background:"none",border:"none",borderBottom:active||h?`1px solid ${C.orange}`:"1px solid transparent",cursor:"pointer",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"DM Sans,sans-serif",color:active||h?C.black:C.grey,transition:"all 0.2s",paddingBottom:2}}>{children}</button>;
}
function Btn({onClick,children,secondary}){
  const [h,setH]=useState(false);
  return <button onClick={onClick} onMouseOver={()=>setH(true)} onMouseOut={()=>setH(false)}
    style={{background:secondary?(h?C.border:"transparent"):h?C.orange:C.black,color:secondary?C.black:C.white,border:secondary?`1px solid ${C.border}`:"none",cursor:"pointer",padding:"8px 18px",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"DM Sans,sans-serif",transition:"background 0.2s"}}>{children}</button>;
}
function BackBtn({onClick,label}){
  const [h,setH]=useState(false);
  return <button onClick={onClick} onMouseOver={()=>setH(true)} onMouseOut={()=>setH(false)}
    style={{background:"none",border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,padding:"18px 40px",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:h?C.black:C.grey,transition:"color 0.2s",fontFamily:"DM Sans,sans-serif"}}>
    <span style={{fontSize:14,transform:h?"translateX(-3px)":"none",transition:"transform 0.2s",display:"inline-block"}}>←</span>{label}
  </button>;
}
function FInput({label,value,onChange,placeholder,type="text"}){
  return <div style={{marginBottom:20}}>
    <label style={{fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.grey,display:"block",marginBottom:8}}>{label}</label>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{width:"100%",padding:"10px 14px",border:`1px solid ${C.border}`,background:C.white,fontFamily:"DM Sans,sans-serif",fontSize:13,outline:"none",color:C.black,boxSizing:"border-box"}}/>
  </div>;
}
function FTextarea({label,value,onChange,placeholder}){
  return <div style={{marginBottom:20}}>
    <label style={{fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.grey,display:"block",marginBottom:8}}>{label}</label>
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={4}
      style={{width:"100%",padding:"10px 14px",border:`1px solid ${C.border}`,background:C.white,fontFamily:"DM Sans,sans-serif",fontSize:13,outline:"none",color:C.black,resize:"vertical",lineHeight:1.6,boxSizing:"border-box"}}/>
  </div>;
}
function FSelect({label,value,onChange,options}){
  return <div style={{marginBottom:20}}>
    <label style={{fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.grey,display:"block",marginBottom:8}}>{label}</label>
    <select value={value} onChange={onChange}
      style={{width:"100%",padding:"10px 14px",border:`1px solid ${C.border}`,background:C.white,fontFamily:"DM Sans,sans-serif",fontSize:13,outline:"none",appearance:"none",color:C.black,boxSizing:"border-box"}}>
      {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  </div>;
}
function DangerBtn({onClick,children}){
  return <button onClick={onClick} style={{background:"none",border:"none",cursor:"pointer",color:"#cc3333",fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:"DM Sans,sans-serif"}}>{children}</button>;
}
function SuccessMsg({show,text}){
  if(!show) return null;
  return <div style={{padding:"12px 16px",background:"#f0fff4",border:"1px solid #a3e9b5",fontSize:12,color:"#1a7a3c",marginBottom:20}}>{text}</div>;
}
function ErrMsg({text}){
  if(!text) return null;
  return <div style={{padding:"12px 16px",background:"#fff0f0",border:"1px solid #ffcccc",fontSize:12,color:"#cc0000",marginBottom:20}}>{text}</div>;
}

// ═══════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════
function HomeScreen({artists,artworks,search,setSearch,onSelectArtist,onSelectWork}){
  const [sortBy,setSortBy]=useState("alpha");
  // Smart search: parse query into name tokens + size/tag keywords
  const SIZE_MAP={"large":"lg","big":"lg","xl":"xl","extra large":"xl","small":"sm","tiny":"sm","medium":"md"};
  const q=search.toLowerCase().trim();

  let filtered, searchMode="artists", matchedArtistIds=[], matchedWorkIds=[];

  if(!q){
    filtered=artists;
    searchMode="artists";
  } else {
    const tokens=q.split(/\s+/);
    const sizeTags=tokens.map(t=>SIZE_MAP[t]).filter(Boolean);
    const freeTags=tokens.filter(t=>!["works","work","paintings","pieces","by","show","large","big","small","medium","tiny","xl"].includes(t));
    const artistMatches=artists.filter(a=>freeTags.some(t=>a.name.toLowerCase().includes(t)));
    if(artistMatches.length>0&&(sizeTags.length>0||tokens.some(t=>["works","work","paintings","pieces"].includes(t))||tokens.length>1)){
      searchMode="artworks";
      matchedArtistIds=artistMatches.map(a=>a.id);
      matchedWorkIds=artworks.filter(w=>{
        if(!matchedArtistIds.includes(w.artist_id)) return false;
        if(sizeTags.length===0&&freeTags.every(t=>artistMatches.some(a=>a.name.toLowerCase().includes(t)))) return true;
        if(sizeTags.length>0){const wTags=(w.tags||[]).map(t=>t.toLowerCase());return sizeTags.some(st=>wTags.includes(st));}
        const nonArtistTokens=freeTags.filter(t=>!artistMatches.some(a=>a.name.toLowerCase().includes(t)));
        if(nonArtistTokens.length===0) return true;
        const wTags=(w.tags||[]).map(t=>t.toLowerCase());
        const wText=`${w.title} ${w.medium} ${w.writeup||""}`.toLowerCase();
        return nonArtistTokens.some(t=>wTags.includes(t)||wText.includes(t));
      }).map(w=>w.id);
      filtered=artistMatches;
    } else {
      searchMode="artists";
      filtered=artists.filter(a=>freeTags.some(t=>a.name.toLowerCase().includes(t)));
    }
  }

  // Apply sort
  const sorted=[...filtered].sort((a,b)=>{
    if(sortBy==="alpha") return a.name.localeCompare(b.name);
    if(sortBy==="works") return artworks.filter(w=>w.artist_id===b.id).length - artworks.filter(w=>w.artist_id===a.id).length;
    if(sortBy==="recent"){
      const aLatest=artworks.filter(w=>w.artist_id===a.id).sort((x,y)=>new Date(y.created_at||0)-new Date(x.created_at||0))[0];
      const bLatest=artworks.filter(w=>w.artist_id===b.id).sort((x,y)=>new Date(y.created_at||0)-new Date(x.created_at||0))[0];
      return new Date(bLatest?.created_at||0)-new Date(aLatest?.created_at||0);
    }
    return 0;
  });

  const groups={};
  // Only group alphabetically when sort is alpha
  if(sortBy==="alpha"){
    sorted.forEach(a=>{const l=a.name[0].toUpperCase();if(!groups[l])groups[l]=[];groups[l].push(a);});
  } else {
    groups["_all"]=sorted;
  }
  return (
    <div>
      <div style={{padding:"24px 40px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
        <img src={LOGO_DATA_URL} alt="Hourglass Gallery" style={{height:40,objectFit:"contain",display:"block",outline:`1px solid ${C.border}`}}/>
        <div style={{marginTop:14,fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",color:C.grey}}>Visitor Catalogue</div>
        <div style={{marginTop:16,display:"flex",gap:40,alignItems:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:28,color:C.orange,lineHeight:1}}>{artists.length}</div>
            <div style={{fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:C.lightGrey,marginTop:4}}>Artists</div>
          </div>
          <div style={{width:1,height:28,background:C.border}}/>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:28,color:C.orange,lineHeight:1}}>{artworks.length}</div>
            <div style={{fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:C.lightGrey,marginTop:4}}>Works</div>
          </div>
        </div>
      </div>
      <div style={{padding:"20px 40px",borderBottom:`1px solid ${C.border}`}}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search by artist, title, tag or e.g. 'Boadi large works'…"
          style={{width:"100%",padding:"12px 0",border:"none",borderBottom:`1px solid ${C.border}`,background:"transparent",fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",color:C.black}}/>
      </div>
      <div style={{padding:"12px 40px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:0}}>
        {[{v:"alpha",l:"A – Z"},{v:"works",l:"Most Works"},{v:"recent",l:"Recently Updated"}].map(opt=>(
          <button key={opt.v} onClick={()=>setSortBy(opt.v)}
            style={{background:"none",border:"none",borderBottom:sortBy===opt.v?`2px solid ${C.orange}`:"2px solid transparent",cursor:"pointer",padding:"8px 20px",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"DM Sans,sans-serif",color:sortBy===opt.v?C.black:C.grey,transition:"all 0.2s"}}>
            {opt.l}
          </button>
        ))}
      </div>
      <div style={{padding:"0 40px"}}>
        {!filtered.length
          ? <div style={{padding:"80px 0",textAlign:"center",color:C.lightGrey,fontFamily:"Cormorant Garamond,serif",fontSize:28,fontWeight:300}}>No artists found</div>
          : searchMode==="artworks" && matchedWorkIds.length>0
            ? <WorkSearchResults workIds={matchedWorkIds} artworks={artworks} artists={artists} onSelectArtist={onSelectArtist} onSelectWork={onSelectWork} search={q}/>
            : Object.keys(groups).sort().map(letter=>(
            <div key={letter}>
              {letter!=="_all"&&<div style={{fontFamily:"Cormorant Garamond,serif",fontSize:13,fontWeight:300,color:C.lightGrey,padding:"20px 0 8px",borderBottom:`1px solid ${C.border}`}}>{letter}</div>}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,marginTop:2}}>
                {groups[letter].map(a=><ArtistRow key={a.id} artist={a} artworks={artworks} onClick={()=>onSelectArtist(a.id)}/>)}
              </div>
            </div>
          ))
        }
      </div>
      <div style={{height:60}}/>
    </div>
  );
}
function WorkSearchResults({workIds,artworks,artists,onSelectArtist,onSelectWork,search}){
  const works=artworks.filter(w=>workIds.includes(w.id));
  return(
    <div>
      <div style={{padding:"20px 0 12px",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:C.grey,borderBottom:`1px solid ${C.border}`}}>
        {works.length} result{works.length!==1?"s":""} for <em style={{color:C.orange,fontStyle:"normal"}}>"{search}"</em>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:2,paddingTop:2}}>
        {works.map(w=>{
          const artist=artists.find(a=>a.id===w.artist_id);
          return(
            <div key={w.id} onClick={()=>onSelectWork(w.id)}
              style={{position:"relative",background:C.border,cursor:"pointer",overflow:"hidden"}}>
              <div style={{aspectRatio:"1",overflow:"hidden"}}>
                <img src={w.image_url} alt={w.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.4s"}}
                  onMouseOver={e=>e.currentTarget.style.transform="scale(1.04)"}
                  onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}
                  onError={e=>{e.target.style.display="none";}}/>
              </div>
              <div style={{padding:"12px 14px 14px",background:C.white,borderTop:`1px solid ${C.border}`}}>
                <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:18,fontWeight:400,color:C.black}}>{w.title}</div>
                <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:C.orange,marginTop:4,cursor:"pointer"}}
                  onClick={e=>{e.stopPropagation();onSelectArtist(w.artist_id);}}>{artist?.name}</div>
                {w.tags&&w.tags.length>0&&(
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
                    {w.tags.map(t=><span key={t} style={{fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",padding:"2px 6px",background:C.bg,border:`1px solid ${C.border}`,color:C.grey}}>{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArtistRow({artist,artworks,onClick}){
  const [h,setH]=useState(false);
  const count=artworks.filter(w=>w.artist_id===artist.id).length;
  return (
    <div onClick={onClick} onMouseOver={()=>setH(true)} onMouseOut={()=>setH(false)}
      style={{background:h?"#fff8f5":C.white,padding:"10px 12px",cursor:"pointer",transition:"background 0.2s",border:`1px solid ${h?C.orange:C.border}`,display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:56}}>
      <div style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:15,fontWeight:400,color:h?C.orange:C.black,transition:"color 0.2s",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{artist.name}</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:6}}>
        <div style={{fontSize:9,color:C.lightGrey,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,paddingRight:8}}>{artist.medium}</div>
        <span style={{fontSize:9,letterSpacing:"0.08em",textTransform:"uppercase",color:h?C.orange:C.grey,whiteSpace:"nowrap",flexShrink:0}}>{count} →</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ARTIST PAGE
// ═══════════════════════════════════════════
function ArtistScreen({artists,artworks,artistId,onBack,onSelectWork}){
  const artist=artists.find(a=>a.id===artistId);
  const works=artworks.filter(w=>w.artist_id===artistId);
  const [copied,setCopied]=useState(false);
  const qrUrl=`${window.location.origin}${window.location.pathname}?artist=${artistId}`;
  if(!artist) return null;

  // Collect unique mediums for this artist's works
  const mediums=[...new Set(works.map(w=>w.medium).filter(Boolean))].sort();
  const [mediumFilter,setMediumFilter]=useState("all");
  const filtered=mediumFilter==="all"?works:works.filter(w=>w.medium===mediumFilter);

  return (
    <div>
      <BackBtn onClick={onBack} label="All Artists"/>

      {/* ── Artist name header ── */}
      <div style={{padding:"24px 40px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
        <div>
          <div style={{fontFamily:"DM Sans,Helvetica Neue,sans-serif",fontSize:22,fontWeight:300,color:C.charcoal,letterSpacing:"0.02em"}}>{artist.name}</div>
          {(artist.nationality||artist.medium)&&(
            <div style={{fontSize:11,color:C.black,marginTop:4,fontFamily:"DM Sans,sans-serif",letterSpacing:"0.04em"}}>
              {[artist.nationality,artist.medium].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          {artist.link&&<a href={artist.link} target="_blank" rel="noreferrer"
            style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:C.lightGrey,textDecoration:"none",fontFamily:"DM Sans,sans-serif"}}>
            Website ↗
          </a>}
          <button onClick={()=>{navigator.clipboard.writeText(qrUrl);setCopied(true);setTimeout(()=>setCopied(false),2000);}}
            style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:copied?C.orange:C.lightGrey,background:"none",border:"none",cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>
            {copied?"Link copied!":"Copy link"}
          </button>
          <QRCode text={qrUrl} size={52}/>
        </div>
      </div>

      {/* ── Medium filter ── */}
      {mediums.length>1&&(
        <div style={{padding:"0 40px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:0,overflowX:"auto"}}>
          {["all",...mediums].map(m=>(
            <button key={m} onClick={()=>setMediumFilter(m)}
              style={{background:"none",border:"none",borderBottom:mediumFilter===m?`2px solid ${C.orange}`:"2px solid transparent",cursor:"pointer",padding:"10px 16px",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"DM Sans,sans-serif",color:mediumFilter===m?C.black:C.grey,whiteSpace:"nowrap",transition:"all 0.2s"}}>
              {m==="all"?`All (${works.length})`:m}
            </button>
          ))}
        </div>
      )}

      {/* ── Works grid ── */}
      <div style={{padding:"24px 40px"}}>
        <div style={{fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:C.lightGrey,marginBottom:16,fontFamily:"DM Sans,sans-serif"}}>
          {filtered.length} Work{filtered.length!==1?"s":""}
          {mediumFilter!=="all"&&<span style={{color:C.orange}}> — {mediumFilter}</span>}
        </div>
        {!filtered.length
          ? <div style={{color:C.lightGrey,fontFamily:"DM Sans,sans-serif",fontSize:13}}>No works match this filter.</div>
          : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:2}}>
              {filtered.map(w=><ThumbItem key={w.id} work={w} onClick={()=>onSelectWork(w.id)}/>)}
            </div>
        }
      </div>

      {/* ── Biography ── */}
      {artist.bio&&(
        <div style={{padding:"32px 40px 60px",borderTop:`1px solid ${C.border}`,maxWidth:640}}>
          <div style={{fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:C.black,marginBottom:12,fontFamily:"DM Sans,sans-serif"}}>Biography</div>
          <div style={{fontFamily:"DM Sans,Helvetica Neue,sans-serif",fontSize:12,fontWeight:300,lineHeight:1.8,color:C.black}}>
            {artist.bio}
          </div>
        </div>
      )}
    </div>
  );
}
function ThumbItem({work,onClick}){
  const line1=[work.title,work.medium].filter(Boolean).join(". ");
  const line2=[work.dimensions?`${work.dimensions} in`:null,work.year].filter(Boolean).join(". ");
  const txt={fontFamily:"DM Sans,Helvetica Neue,sans-serif",fontSize:10,fontWeight:400,color:C.black,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",lineHeight:1.5};
  return (
    <div onClick={onClick} style={{background:C.white,cursor:"pointer",border:`1px solid ${C.border}`}}>
      <div style={{aspectRatio:"1",overflow:"hidden",background:C.border}}>
        <img src={work.image_url} alt={work.title}
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:work.image_position==="top"?"top":"center",display:"block"}}
          onError={e=>{e.target.style.display="none";}}/>
      </div>
      <div style={{padding:"7px 10px 9px",borderTop:`1px solid ${C.border}`,textAlign:"center"}}>
        <div style={txt}>{line1}</div>
        <div style={txt}>{line2}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ARTWORK PAGE
// ═══════════════════════════════════════════
function ArtworkScreen({artists,artworks,artworkId,onBack}){
  const work=artworks.find(w=>w.id===artworkId);
  const artist=work?artists.find(a=>a.id===work.artist_id):null;
  const [copied,setCopied]=useState(false);
  const shareUrl=`${window.location.origin}${window.location.pathname}?artwork=${artworkId}`;
  if(!work) return null;
  const specs=[["Year",work.year],["Medium",work.medium],["Dimensions",work.dimensions?`${work.dimensions} in`:null],["Series / Edition",work.series],["Availability",work.availability]].filter(([,v])=>v);
  return (
    <div>
      <BackBtn onClick={onBack} label={artist?.name||"Artist"}/>

      {/* Image — flush, no white box, background matches page */}
      <div style={{width:"100%",maxHeight:"72vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg,overflow:"hidden"}}>
        <img src={work.image_url} alt={work.title} style={{maxWidth:"100%",maxHeight:"72vh",objectFit:"contain",display:"block"}}/>
      </div>

      {/* Details */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:48,padding:"28px 40px 80px",borderTop:`1px solid ${C.border}`,marginTop:28}}>
        <div>
          {/* Title — smaller, grey, sans-serif */}
          <div style={{fontFamily:"DM Sans,Helvetica Neue,sans-serif",fontSize:18,fontWeight:400,color:C.charcoal,lineHeight:1.3}}>{work.title}</div>
          {/* Artist — small, lighter grey */}
          <div style={{fontFamily:"DM Sans,sans-serif",fontSize:11,color:C.lightGrey,marginTop:6,cursor:"pointer",letterSpacing:"0.04em"}} onClick={onBack}>{artist?.name}</div>
          {work.writeup&&(
            <div style={{fontFamily:"DM Sans,Helvetica Neue,sans-serif",fontSize:12,fontWeight:300,lineHeight:1.8,color:C.lightGrey,marginTop:20,maxWidth:500}}>
              {work.writeup}
            </div>
          )}
        </div>
        <div>
          {specs.map(([k,v])=>(
            <div key={k} style={{padding:"10px 0",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
              <span style={{fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",color:C.lightGrey,fontFamily:"DM Sans,sans-serif"}}>{k}</span>
              <span style={{fontFamily:"DM Sans,sans-serif",fontSize:12,color:C.grey,textAlign:"right"}}>
                {k==="Availability"?<AvailBadge value={v}/>:v}
              </span>
            </div>
          ))}
          <div style={{marginTop:20,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:9,color:C.lightGrey,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,fontFamily:"DM Sans,sans-serif"}}>{shareUrl}</span>
            <button onClick={()=>{navigator.clipboard.writeText(shareUrl);setCopied(true);setTimeout(()=>setCopied(false),2000);}}
              style={{background:copied?C.orange:C.black,color:C.white,border:"none",cursor:"pointer",padding:"7px 12px",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",whiteSpace:"nowrap",fontFamily:"DM Sans,sans-serif",transition:"background 0.2s",flexShrink:0}}>
              {copied?"Copied!":"Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ADMIN
// ═══════════════════════════════════════════
function AdminScreen({artists,artworks,setArtists,setArtworks,onBack,reload}){
  const [tab,setTab]=useState("artists");
  const tabs=[{id:"artists",label:"Artists"},{id:"artworks",label:"Artworks"},{id:"batch",label:"⊕ Batch Upload"},{id:"add-artist",label:"+ Add Artist"},{id:"add-artwork",label:"+ Add Artwork"}];
  return (
    <div style={{padding:"40px",flex:1}}>
      <BackBtn onClick={onBack} label="Back to Gallery"/>
      <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:40,fontWeight:300,marginBottom:4}}>Admin Panel</div>
      <div style={{fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:C.grey,marginBottom:36}}>Hourglass Gallery — Content Management</div>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:32,flexWrap:"wrap"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{background:"none",border:"none",borderBottom:tab===t.id?`2px solid ${C.orange}`:"2px solid transparent",cursor:"pointer",padding:"12px 20px",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:tab===t.id?C.black:t.id==="batch"?C.orange:C.grey,fontFamily:"DM Sans,sans-serif",transition:"all 0.2s",fontWeight:t.id==="batch"?500:400}}>
            {t.label}
          </button>
        ))}
      </div>
      {tab==="artists"     && <ArtistsList   artists={artists} artworks={artworks} setArtists={setArtists} setArtworks={setArtworks} reload={reload}/>}
      {tab==="artworks"    && <ArtworksList  artists={artists} artworks={artworks} setArtworks={setArtworks} reload={reload}/>}
      {tab==="batch"       && <BatchUpload   artists={artists} setArtworks={setArtworks} reload={reload}/>}
      {tab==="add-artist"  && <AddArtistForm artists={artists} setArtists={setArtists} reload={reload}/>}
      {tab==="add-artwork" && <AddArtworkForm artists={artists} setArtworks={setArtworks} reload={reload}/>}
    </div>
  );
}

// ── Artists list ──────────────────────────
function ArtistsList({artists,artworks,setArtists,setArtworks,reload}){
  const [busy,setBusy]=useState("");
  const del=async id=>{
    if(!confirm("Delete this artist and all their artworks?")) return;
    setBusy(id);
    try{ await sbDelete("artists",id); await reload(); }
    catch(e){ alert("Error: "+e.message); }
    setBusy("");
  };
  return (
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr>{["Name","Medium","Works",""].map(h=><th key={h} style={{fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:C.grey,padding:"10px 12px",borderBottom:`1px solid ${C.border}`,textAlign:"left"}}>{h}</th>)}</tr></thead>
      <tbody>
        {!artists.length&&<tr><td colSpan={4} style={{padding:24,color:C.grey}}>No artists yet. Add one using the tab above.</td></tr>}
        {artists.map(a=>(
          <tr key={a.id}>
            <td style={{padding:"14px 12px",borderBottom:`1px solid ${C.border}`,fontFamily:"Cormorant Garamond,serif",fontSize:20}}>{a.name}</td>
            <td style={{padding:"14px 12px",borderBottom:`1px solid ${C.border}`,fontSize:12,color:C.charcoal}}>{a.medium}</td>
            <td style={{padding:"14px 12px",borderBottom:`1px solid ${C.border}`,fontSize:13}}>{artworks.filter(w=>w.artist_id===a.id).length}</td>
            <td style={{padding:"14px 12px",borderBottom:`1px solid ${C.border}`}}>{busy===a.id?<span style={{fontSize:11,color:C.grey}}>Deleting…</span>:<DangerBtn onClick={()=>del(a.id)}>Delete</DangerBtn>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Artworks list ─────────────────────────
function ArtworksList({artists,artworks,setArtworks,reload}){
  const [busy,setBusy]=useState("");
  const del=async id=>{
    if(!confirm("Delete this artwork?")) return;
    setBusy(id);
    try{ await sbDelete("artworks",id); await reload(); }
    catch(e){ alert("Error: "+e.message); }
    setBusy("");
  };
  return (
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr>{["","Title","Artist","Year","Medium",""].map((h,i)=><th key={i} style={{fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:C.grey,padding:"10px 12px",borderBottom:`1px solid ${C.border}`,textAlign:"left"}}>{h}</th>)}</tr></thead>
      <tbody>
        {!artworks.length&&<tr><td colSpan={6} style={{padding:24,color:C.grey}}>No artworks yet.</td></tr>}
        {artworks.map(w=>{
          const art=artists.find(a=>a.id===w.artist_id);
          return <tr key={w.id}>
            <td style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`}}><img src={w.image_url} alt="" style={{width:40,height:40,objectFit:"cover",background:C.border,display:"block"}}/></td>
            <td style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,fontFamily:"Cormorant Garamond,serif",fontSize:17}}>{w.title}</td>
            <td style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,fontSize:13,color:C.charcoal}}>{art?.name}</td>
            <td style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,fontSize:13}}>{w.year}</td>
            <td style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,fontSize:12,color:C.grey}}>{w.medium}</td>
            <td style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`}}>{busy===w.id?<span style={{fontSize:11,color:C.grey}}>Deleting…</span>:<DangerBtn onClick={()=>del(w.id)}>Delete</DangerBtn>}</td>
          </tr>;
        })}
      </tbody>
    </table>
  );
}

// ── Batch upload ──────────────────────────
function BatchUpload({artists,setArtworks,reload}){
  const [artistId,setArtistId]=useState("");
  const [sharedMedium,setSharedMedium]=useState("");
  const [sharedYear,setSharedYear]=useState("");
  const [items,setItems]=useState([]);
  const [dragging,setDragging]=useState(false);
  const [saving,setSaving]=useState(false);
  const [progress,setProgress]=useState({done:0,total:0});
  const [ok,setOk]=useState(false);
  const [err,setErr]=useState("");

  const parseFile=async file=>{
    const rawName=file.name.replace(/\.[^.]+$/,"");
    const {dataUrl,origW,origH,newW,newH,kb}=await compressImage(file);

    // Structured filename format:
    // Artist, Title, Medium, Dimensions, Year, Price
    // e.g. "Amara Osei, Threshold I, Oil on canvas, 150x120cm, 2022, 4,500,000"
    // Price may contain commas so we take only the FIRST 5 comma-splits,
    // then treat everything after the 5th comma as the price field.
    const raw=rawName;
    let parsedArtist="", title="", medium="", dimensions="", year="", price="";

    // Split into max 6 parts — price is rejoined if it contains commas
    const allParts=raw.split(",").map(s=>s.trim());

    if(allParts.length>=2){
      parsedArtist = allParts[0] || "";
      title        = allParts[1] || "";
      medium       = allParts[2] || "";
      dimensions   = allParts[3] || "";
      year         = allParts[4] || "";
      // Everything from index 5 onwards rejoined = price (handles 4,500,000)
      price        = allParts.slice(5).join(",").trim();
    } else {
      // Fallback: plain filename as title
      title=raw.replace(/[-_]/g," ").replace(/\b\w/g,c=>c.toUpperCase());
    }

    return {
      id:"b"+Date.now()+Math.random(),
      image:dataUrl,
      parsedArtist,
      title, medium, dimensions,
      year, price,
      imageDimensions:`${origW} × ${origH} px`,
      compressInfo:`${newW}×${newH}px · ${kb}KB`,
      availability:"Available",
      writeup:"",
    };
  };

  const addFiles=async files=>{
    const arr=Array.from(files).filter(f=>f.type.startsWith("image/"));
    const parsed=await Promise.all(arr.map(parseFile));
    // Auto-resolve parsedArtist string → artist id (case-insensitive partial match)
    const resolved=parsed.map(item=>{
      if(!item.parsedArtist) return item;
      const match=artists.find(a=>
        a.name.toLowerCase().includes(item.parsedArtist.toLowerCase()) ||
        item.parsedArtist.toLowerCase().includes(a.name.toLowerCase())
      );
      return {...item, resolvedArtistId:match?match.id:"", resolvedArtistName:match?match.name:""};
    });
    setItems(prev=>[...prev,...resolved]);
  };

  const applyShared=()=>setItems(prev=>prev.map(it=>({...it,
    medium:sharedMedium||it.medium, year:sharedYear||it.year})));

  const update=(id,field,val)=>setItems(prev=>prev.map(it=>it.id===id?{...it,[field]:val}:it));
  const remove=id=>setItems(prev=>prev.filter(it=>it.id!==id));

  const saveAll=async()=>{
    if(!artistId){setErr("Please select an artist.");return;}
    if(!items.length){setErr("No images to save.");return;}
    setSaving(true); setErr(""); setProgress({done:0,total:items.length});
    let failed=0;
    for(let i=0;i<items.length;i++){
      const it=items[i];
      try{
        const imageUrl=await sbUploadImage("artwork-images",null,it.image);
        await sbInsert("artworks",{
          artist_id:it.resolvedArtistId||artistId,
          title:it.title, year:it.year||null,
          medium:it.medium||null, dimensions:it.dimensions||null,
          series:it.series||null, availability:it.availability,
          writeup:it.writeup||null, image_url:imageUrl,
          price:it.price||null,
        });
      } catch(e){ failed++; }
      setProgress({done:i+1,total:items.length});
    }
    await reload();
    setSaving(false);
    if(failed>0) setErr(`${failed} artwork(s) failed to upload. The rest were saved.`);
    else { setOk(true); setTimeout(()=>setOk(false),4000); }
    setItems([]);
  };

  return (
    <div style={{maxWidth:1100}}>
      <SuccessMsg show={ok} text={`All artworks saved to Supabase successfully.`}/>
      <ErrMsg text={err}/>

      {/* Step 1 */}
      <div style={{background:C.white,border:`1px solid ${C.border}`,padding:24,marginBottom:24}}>
        <div style={{fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:C.grey,marginBottom:16}}>Step 1 — Artist &amp; Shared Fields</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:16,alignItems:"flex-end"}}>
          <FSelect label="Artist *" value={artistId} onChange={e=>setArtistId(e.target.value)}
            options={[{value:"",label:"— Select artist —"},...artists.map(a=>({value:a.id,label:a.name}))]}/>
          <FInput label="Apply medium to all" value={sharedMedium} onChange={e=>setSharedMedium(e.target.value)} placeholder="e.g. Oil on canvas"/>
          <FInput label="Apply year to all" value={sharedYear} onChange={e=>setSharedYear(e.target.value)} placeholder="e.g. 2024"/>
          <div style={{paddingBottom:20}}><Btn onClick={applyShared}>Apply to All</Btn></div>
        </div>
      </div>

      {/* Drop zone */}
      <div onDrop={async e=>{e.preventDefault();setDragging(false);await addFiles(e.dataTransfer.files);}}
        onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)}
        style={{border:`1.5px dashed ${dragging?C.orange:C.border}`,padding:"40px 24px",textAlign:"center",marginBottom:24,position:"relative",transition:"border-color 0.2s",background:dragging?"#fff8f5":C.white,cursor:"pointer"}}>
        <input type="file" accept="image/*" multiple onChange={e=>addFiles(e.target.files)}
          style={{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"}}/>
        <div style={{fontSize:28,color:C.lightGrey,marginBottom:10}}>⊕</div>
        <div style={{fontSize:14,color:C.grey,fontFamily:"Cormorant Garamond,serif",fontWeight:300}}>Drop multiple images here, or click to select files</div>
        <div style={{fontSize:10,color:C.lightGrey,marginTop:6,letterSpacing:"0.08em",textTransform:"uppercase"}}>
          Auto-compressed · Filename format: Artist, Title, Medium, Dimensions, Year, Price
        </div>
      </div>

      {/* Progress */}
      {saving&&(
        <div style={{marginBottom:24,border:`1px solid ${C.border}`,padding:20,background:C.white}}>
          <div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:C.grey,marginBottom:12}}>
            Uploading {progress.done} of {progress.total}…
          </div>
          <div style={{height:3,background:C.border,borderRadius:2}}>
            <div style={{height:"100%",background:C.orange,borderRadius:2,width:`${progress.total?progress.done/progress.total*100:0}%`,transition:"width 0.3s"}}/>
          </div>
        </div>
      )}

      {/* Cards */}
      {items.length>0&&!saving&&(
        <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:C.grey}}>
              Step 2 — Review {items.length} Image{items.length!==1?"s":""}
            </div>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <button onClick={()=>setItems([])} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:C.grey,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:"DM Sans,sans-serif"}}>Clear all</button>
              <Btn onClick={saveAll}>Upload All {items.length} to Supabase →</Btn>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"72px 1fr 140px 160px 80px 100px 110px 100px 40px",padding:"6px 0",marginBottom:2,borderBottom:`1px solid ${C.border}`}}>
            {["","Title / Artist","Artist","Medium","Year","Avail.","NGN Price","",""].map((h,i)=>(
              <div key={i} style={{padding:"0 10px",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",color:C.lightGrey}}>{h}</div>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            {items.map((it,idx)=><BatchCard key={it.id} item={it} index={idx} onUpdate={update} onRemove={remove} artists={artists}/>)}
          </div>
          <div style={{marginTop:20,paddingTop:20,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"flex-end"}}>
            <Btn onClick={saveAll}>Upload All {items.length} to Supabase →</Btn>
          </div>
        </>
      )}
    </div>
  );
}

function BatchCard({item,index,onUpdate,onRemove,artists}){
  const [exp,setExp]=useState(false);
  const u=f=>e=>onUpdate(item.id,f,typeof e==="string"?e:e.target.value);
  const artistUnmatched=item.parsedArtist&&!item.resolvedArtistId;
  return (
    <div style={{border:`1px solid ${artistUnmatched?"#ffcccc":C.border}`,background:C.white}}>
      <div style={{display:"grid",gridTemplateColumns:"72px 1fr 140px 160px 80px 100px 110px 100px 40px",alignItems:"center"}}>
        <img src={item.image} alt="" style={{width:72,height:72,objectFit:"cover",display:"block",borderRight:`1px solid ${C.border}`}}/>

        {/* Title + artist match */}
        <div style={{padding:"0 12px"}}>
          <input value={item.title} onChange={u("title")} placeholder="Title"
            style={{width:"100%",border:"none",borderBottom:`1px solid ${C.border}`,padding:"4px 0",fontFamily:"Cormorant Garamond,serif",fontSize:16,outline:"none",background:"transparent",color:C.black}}/>
          {item.resolvedArtistName
            ? <div style={{fontSize:10,color:"#1a7a3c",marginTop:3,letterSpacing:"0.06em"}}>✓ {item.resolvedArtistName}</div>
            : item.parsedArtist
              ? <div style={{fontSize:10,color:"#cc3333",marginTop:3}}>⚠ No match: "{item.parsedArtist}"</div>
              : <div style={{fontSize:10,color:C.lightGrey,marginTop:3}}>{item.compressInfo}</div>
          }
        </div>

        {/* Artist override dropdown */}
        <div style={{padding:"0 10px",borderLeft:`1px solid ${C.border}`}}>
          <select value={item.resolvedArtistId||""} onChange={e=>onUpdate(item.id,"resolvedArtistId",e.target.value)}
            style={{width:"100%",border:"none",padding:"4px 0",fontFamily:"DM Sans,sans-serif",fontSize:11,outline:"none",background:"transparent",color:artistUnmatched?C.orange:C.charcoal,appearance:"none"}}>
            <option value="">— artist —</option>
            {artists.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>

        {/* Medium */}
        <div style={{padding:"0 10px",borderLeft:`1px solid ${C.border}`}}>
          <input value={item.medium} onChange={u("medium")} placeholder="Medium"
            style={{width:"100%",border:"none",padding:"4px 0",fontFamily:"DM Sans,sans-serif",fontSize:11,outline:"none",background:"transparent",color:C.charcoal}}/>
        </div>

        {/* Year */}
        <div style={{padding:"0 10px",borderLeft:`1px solid ${C.border}`}}>
          <input value={item.year} onChange={u("year")} placeholder="Year"
            style={{width:"100%",border:"none",padding:"4px 0",fontFamily:"DM Sans,sans-serif",fontSize:11,outline:"none",background:"transparent",color:C.charcoal}}/>
        </div>

        {/* Availability */}
        <div style={{padding:"0 10px",borderLeft:`1px solid ${C.border}`}}>
          <select value={item.availability} onChange={u("availability")}
            style={{width:"100%",border:"none",padding:"4px 0",fontFamily:"DM Sans,sans-serif",fontSize:11,outline:"none",background:"transparent",color:C.charcoal,appearance:"none"}}>
            {["Available","Sold","On Loan","NFS"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>

        {/* Price */}
        <div style={{padding:"0 10px",borderLeft:`1px solid ${C.border}`}}>
          <input value={item.price||""} onChange={u("price")} placeholder="e.g. 4,500,000"
            style={{width:"100%",border:"none",padding:"4px 0",fontFamily:"DM Sans,sans-serif",fontSize:11,outline:"none",background:"transparent",color:C.charcoal}}/>
        </div>

        {/* More / Remove */}
        <div style={{padding:"0 8px",borderLeft:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>setExp(e=>!e)} style={{background:"none",border:"none",cursor:"pointer",fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",color:C.orange,fontFamily:"DM Sans,sans-serif",whiteSpace:"nowrap"}}>
            {exp?"▲":"▼"}
          </button>
          <button onClick={()=>onRemove(item.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.lightGrey,lineHeight:1}}>×</button>
        </div>
      </div>

      {exp&&(
        <div style={{padding:"16px 20px",borderTop:`1px solid ${C.border}`,background:"#fcfcfa",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          <FInput label="Dimensions" value={item.dimensions} onChange={u("dimensions")} placeholder="e.g. 120 × 90 cm"/>
          <FInput label="NGN Price" value={item.price||""} onChange={u("price")} placeholder="e.g. 4,500,000"/>
          <FTextarea label="Art Write-up" value={item.writeup} onChange={u("writeup")} placeholder="Description or note…"/>
        </div>
      )}
    </div>
  );
}

// ── Add single artist ─────────────────────
function AddArtistForm({artists,setArtists,reload}){
  const [form,setForm]=useState({name:"",nationality:"",medium:"",bio:"",link:"",portrait_url:""});
  const [ok,setOk]=useState(false); const [err,setErr]=useState(""); const [saving,setSaving]=useState(false);
  const f=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const handlePortrait=async e=>{
    const file=e.target.files[0]; if(!file) return;
    const {dataUrl}=await compressImage(file);
    setForm(p=>({...p,_portraitData:dataUrl}));
  };
  const save=async()=>{
    if(!form.name.trim()){setErr("Artist name is required.");return;}
    setSaving(true); setErr("");
    try{
      let portrait_url="";
      if(form._portraitData) portrait_url=await sbUploadImage("artist-portraits",null,form._portraitData);
      const {_portraitData,...rest}=form;
      await sbInsert("artists",{...rest,portrait_url,name:form.name.trim()});
      await reload();
      setForm({name:"",nationality:"",medium:"",bio:"",link:"",portrait_url:""});
      setOk(true); setTimeout(()=>setOk(false),3000);
    } catch(e){ setErr("Error saving: "+e.message); }
    setSaving(false);
  };
  return (
    <div style={{maxWidth:800}}>
      <SuccessMsg show={ok} text="Artist saved to Supabase."/>
      <ErrMsg text={err}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        <div>
          <FInput label="Full Name *" value={form.name} onChange={f("name")} placeholder="e.g. Amara Osei"/>
          <FInput label="Nationality / Origin" value={form.nationality} onChange={f("nationality")} placeholder="e.g. Ghanaian, b. 1980"/>
          <FInput label="Primary Medium" value={form.medium} onChange={f("medium")} placeholder="e.g. Oil on canvas"/>
          <FTextarea label="Short Biography" value={form.bio} onChange={f("bio")} placeholder="A brief biography (2–4 sentences)…"/>
          <FInput label="Website / Instagram" value={form.link} onChange={f("link")} placeholder="https://…"/>
        </div>
        <div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.grey,display:"block",marginBottom:8}}>Portrait (optional)</label>
            <div style={{border:`1.5px dashed ${C.border}`,padding:28,textAlign:"center",position:"relative",cursor:"pointer"}}>
              <input type="file" accept="image/*" onChange={handlePortrait} style={{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"}}/>
              {form._portraitData?<img src={form._portraitData} alt="" style={{maxWidth:"100%",maxHeight:160,objectFit:"contain"}}/>:
                <div style={{fontSize:12,color:C.grey}}>Upload portrait<br/><span style={{fontSize:10,color:C.lightGrey}}>Auto-compressed before upload</span></div>}
            </div>
          </div>
        </div>
      </div>
      <Btn onClick={save}>{saving?"Saving…":"Save Artist"}</Btn>
    </div>
  );
}

// ── Add single artwork ────────────────────
function AddArtworkForm({artists,setArtworks,reload}){
  const [form,setForm]=useState({title:"",year:"",medium:"",dimensions:"",series:"",availability:"Available",writeup:"",_imageData:"",artist_id:""});
  const [ok,setOk]=useState(false); const [err,setErr]=useState(""); const [saving,setSaving]=useState(false);
  const f=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const handleImage=async e=>{
    const file=e.target.files[0]; if(!file) return;
    const name=file.name.replace(/\.[^.]+$/,"").replace(/[-_]/g," ").replace(/\b\w/g,c=>c.toUpperCase());
    const {dataUrl,origW,origH}=await compressImage(file);
    setForm(p=>({...p,_imageData:dataUrl,title:p.title||name,dimensions:p.dimensions||`${origW} × ${origH} px`}));
  };
  const save=async()=>{
    if(!form.title.trim()){setErr("Title required.");return;}
    if(!form.artist_id){setErr("Select an artist.");return;}
    if(!form._imageData){setErr("Upload an image.");return;}
    setSaving(true); setErr("");
    try{
      const image_url=await sbUploadImage("artwork-images",null,form._imageData);
      const {_imageData,...rest}=form;
      await sbInsert("artworks",{...rest,image_url,title:form.title.trim()});
      await reload();
      setForm({title:"",year:"",medium:"",dimensions:"",series:"",availability:"Available",writeup:"",_imageData:"",artist_id:""});
      setOk(true); setTimeout(()=>setOk(false),3000);
    } catch(e){ setErr("Error saving: "+e.message); }
    setSaving(false);
  };
  return (
    <div style={{maxWidth:800}}>
      <SuccessMsg show={ok} text="Artwork saved to Supabase."/>
      <ErrMsg text={err}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        <div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.grey,display:"block",marginBottom:8}}>Image *</label>
            <div style={{border:`1.5px dashed ${C.border}`,padding:28,textAlign:"center",position:"relative",cursor:"pointer"}}>
              <input type="file" accept="image/*" onChange={handleImage} style={{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"}}/>
              {form._imageData?<img src={form._imageData} alt="" style={{maxWidth:"100%",maxHeight:180,objectFit:"contain"}}/>:
                <div style={{fontSize:12,color:C.grey}}>Upload image<br/><span style={{fontSize:10,color:C.lightGrey}}>Auto-compressed · Uploads to Supabase Storage</span></div>}
            </div>
          </div>
          <FInput label="Title *" value={form.title} onChange={f("title")} placeholder="Artwork title"/>
          <FInput label="Year" value={form.year} onChange={f("year")} placeholder="e.g. 2024"/>
          <FInput label="Medium" value={form.medium} onChange={f("medium")} placeholder="e.g. Oil on linen"/>
        </div>
        <div>
          <FSelect label="Artist *" value={form.artist_id} onChange={f("artist_id")}
            options={[{value:"",label:"— Select artist —"},...artists.map(a=>({value:a.id,label:a.name}))]}/>
          <FInput label="Dimensions" value={form.dimensions} onChange={f("dimensions")} placeholder="e.g. 120 × 90 cm"/>
          <FInput label="Edition / Series" value={form.series} onChange={f("series")} placeholder="e.g. Edition 1/5"/>
          <FSelect label="Availability" value={form.availability} onChange={f("availability")}
            options={["Available","Sold","On Loan","NFS"]}/>
          <FTextarea label="Write-up" value={form.writeup} onChange={f("writeup")} placeholder="Description or note…"/>
        </div>
      </div>
      <Btn onClick={save}>{saving?"Uploading…":"Save Artwork"}</Btn>
    </div>
  );
}
